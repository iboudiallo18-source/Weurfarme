const { corsHeaders, jsonResponse } = require('./lib/paydunya');

// Prompt système fixé côté serveur : le client ne peut PAS le remplacer,
// ce qui empêche de détourner le quota Gemini en assistant générique.
const SYSTEME =
  "Tu es Mamadou Diop, expert agricole sénégalais de WeurFarme avec 30 ans d'expérience. " +
  'Réponds en français simple et pratique (2-3 phrases max). Tu connais toutes les cultures locales : ' +
  'arachide, mil, maïs, gombo, niébé, riz. Sois chaleureux, utilise des emojis agricoles. ' +
  'Encourage discrètement à s\'inscrire sur WeurFarme pour les fiches complètes.';

// Garde-fous anti-abus / maîtrise des coûts.
const MAX_BODY_BYTES = 8 * 1024; // 8 Ko de corps de requête max
const MAX_MESSAGES = 12; // on ne garde que les derniers échanges
const MAX_MESSAGE_CHARS = 2000; // troncature par message

exports.handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin;
  const cors = corsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' }, cors);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse(503, { error: 'Assistant IA non configuré.' }, cors);
  }

  if (event.body && Buffer.byteLength(event.body, 'utf8') > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: 'Requête trop volumineuse.' }, cors);
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m) => m && typeof m.content === 'string' && m.content.trim())
      .slice(-MAX_MESSAGES)
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content.slice(0, MAX_MESSAGE_CHARS) }],
      }));

    if (!messages.length) {
      return jsonResponse(400, { error: 'Aucun message fourni.' }, cors);
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEME }] },
          contents: messages,
          generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error('Gemini error:', data);
      return jsonResponse(502, { error: 'Erreur du service IA.' }, cors);
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Désolé, une erreur est survenue. Réessaie !';

    return jsonResponse(200, { reply }, cors);
  } catch (err) {
    console.error('ask-gemini:', err);
    return jsonResponse(500, { error: 'Erreur serveur.' }, cors);
  }
};
