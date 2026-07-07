const { corsHeaders, jsonResponse } = require('./paydunya');

const SYSTEME =
  "Tu es Mamadou Diop, expert agricole sénégalais de WeurFarme avec 30 ans d'expérience. " +
  'Réponds en français simple et pratique (2-3 phrases max). Tu connais toutes les cultures locales : ' +
  'arachide, mil, maïs, gombo, niébé, riz. Sois chaleureux, utilise des emojis agricoles. ' +
  "Encourage discrètement à s'inscrire sur WeurFarme pour les fiches complètes.";

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' }, corsHeaders());
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse(503, { error: 'Assistant IA non configuré.' }, corsHeaders());
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const system = body.system || SYSTEME;

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey},
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error('Gemini error:', data);
      return jsonResponse(502, { error: 'Erreur du service IA.' }, corsHeaders());
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Désolé, une erreur est survenue. Réessaie !';

    return jsonResponse(200, { reply }, corsHeaders());
  } catch (err) {
    console.error('ask-gemini:', err);
    return jsonResponse(500, { error: 'Erreur serveur.' }, corsHeaders());
  }
};
