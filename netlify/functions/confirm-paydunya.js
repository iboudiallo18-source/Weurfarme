const { corsHeaders, jsonResponse } = require('./paydunya');
const { confirmAndActivate } = require('./webhook-paydunya');
const { getUserFromJwt } = require('./supabase-admin');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' }, corsHeaders());
  }

  try {
    const auth = event.headers.authorization || event.headers.Authorization || '';
    const jwt = auth.replace(/^Bearer\s+/i, '').trim();
    if (!jwt) {
      return jsonResponse(401, { error: 'Non authentifié.' }, corsHeaders());
    }

    const user = await getUserFromJwt(jwt);
    if (!user?.id) {
      return jsonResponse(401, { error: 'Session invalide.' }, corsHeaders());
    }

    const body = JSON.parse(event.body || '{}');
    const token = body.token || '';
    if (!token) {
      return jsonResponse(400, { error: 'Token de facture manquant.' }, corsHeaders());
    }

    const result = await confirmAndActivate(token);

    if (result.ignored) {
      return jsonResponse(200, {
        success: false,
        status: result.status,
        message: 'Paiement pas encore confirmé.',
      }, corsHeaders());
    }

    return jsonResponse(200, { success: true }, corsHeaders());
  } catch (err) {
    console.error('confirm-paydunya:', err);
    return jsonResponse(500, { error: err.message || 'Erreur de confirmation.' }, corsHeaders());
  }
};
