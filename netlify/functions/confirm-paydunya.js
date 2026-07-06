const { corsHeaders, jsonResponse } = require('./lib/paydunya');
const { confirmAndActivate } = require('./webhook-paydunya');
const { getUserFromJwt } = require('./lib/supabase-admin');

exports.handler = async (event) => {
  const cors = corsHeaders(event.headers?.origin || event.headers?.Origin);
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' }, cors);
  }

  try {
    const auth = event.headers.authorization || event.headers.Authorization || '';
    const jwt = auth.replace(/^Bearer\s+/i, '').trim();
    if (!jwt) {
      return jsonResponse(401, { error: 'Non authentifié.' }, cors);
    }

    const user = await getUserFromJwt(jwt);
    if (!user?.id) {
      return jsonResponse(401, { error: 'Session invalide.' }, cors);
    }

    const body = JSON.parse(event.body || '{}');
    const token = body.token || '';
    if (!token) {
      return jsonResponse(400, { error: 'Token de facture manquant.' }, cors);
    }

    const result = await confirmAndActivate(token);

    if (result.ignored) {
      return jsonResponse(200, {
        success: false,
        status: result.status,
        message: 'Paiement pas encore confirmé.',
      }, cors);
    }

    return jsonResponse(200, { success: true }, cors);
  } catch (err) {
    console.error('confirm-paydunya:', err);
    return jsonResponse(500, { error: err.message || 'Erreur de confirmation.' }, cors);
  }
};
