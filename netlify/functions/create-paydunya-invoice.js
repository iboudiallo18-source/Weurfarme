const {
  corsHeaders,
  jsonResponse,
  getAmountForCurrency,
  createCheckoutInvoice,
} = require('./lib/paydunya');
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
      return jsonResponse(401, { error: 'Connecte-toi avant de payer.' }, cors);
    }

    const user = await getUserFromJwt(jwt);
    if (!user || !user.id) {
      return jsonResponse(401, { error: 'Session invalide. Reconnecte-toi.' }, cors);
    }

    if (user.user_metadata?.abonne === true) {
      return jsonResponse(400, { error: 'Tu es déjà abonné.' }, cors);
    }

    const body = JSON.parse(event.body || '{}');
    const devise = body.devise || 'XOF';
    const channel = body.channel || null;
    const meta = user.user_metadata || {};

    const amount = getAmountForCurrency(devise);
    const channels = channel ? [channel] : undefined;

    const { checkoutUrl, token } = await createCheckoutInvoice({
      amount,
      devise,
      description: 'Abonnement WeurFarme 1 an',
      channels,
      customer: {
        name: [meta.prenom, meta.nom].filter(Boolean).join(' ') || 'Client WeurFarme',
        email: user.email || '',
        phone: (meta.telephone || '').replace(/^\+221/, ''),
      },
      customData: {
        user_id: user.id,
        pays: body.pays || 'SN',
        methode: body.methode || '',
      },
    });

    return jsonResponse(200, { checkoutUrl, token }, cors);
  } catch (err) {
    console.error('create-paydunya-invoice:', err);
    return jsonResponse(500, { error: err.message || 'Erreur serveur.' }, cors);
  }
};
