const {
  verifyPaydunyaHash,
  parseWebhookBody,
  jsonResponse,
  confirmInvoiceToken,
} = require('./paydunya');
const { activerAbonnement } = require('./supabase-admin');

async function traiterPaiementReussi(payload) {
  if (!verifyPaydunyaHash(payload.hash)) {
    throw new Error('Hash PayDunya invalide.');
  }

  const status = (payload.status || '').toLowerCase();
  if (status !== 'completed') {
    return { ignored: true, status };
  }

  const userId = payload.custom_data?.user_id;
  if (!userId) {
    throw new Error('user_id manquant dans custom_data.');
  }

  await activerAbonnement(userId, {
    paydunya_token: payload.invoice?.token  payload.token  '',
  });

  return { success: true, userId };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' });
  }

  try {
    const payload = parseWebhookBody(event.body);
    if (!payload) {
      return jsonResponse(400, { error: 'Corps IPN invalide.' });
    }

    const result = await traiterPaiementReussi(payload);
    return jsonResponse(200, result);
  } catch (err) {
    console.error('webhook-paydunya:', err);
    return jsonResponse(401, { error: err.message || 'Webhook rejeté.' });
  }
};

exports.traiterPaiementReussi = traiterPaiementReussi;
exports.confirmAndActivate = async (invoiceToken) => {
  const payload = await confirmInvoiceToken(invoiceToken);
  if (payload.response_code !== '00') {
    throw new Error(payload.response_text || 'Facture introuvable.');
  }
  return traiterPaiementReussi(payload);
};
