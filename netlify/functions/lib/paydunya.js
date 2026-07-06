const crypto = require('crypto');

const SITE_URL = (process.env.URL || process.env.SITE_URL || 'https://weurfarmeagrisn.netlify.app').replace(/\/$/, '');

function getPaydunyaBaseUrl() {
  const mode = (process.env.PAYDUNYA_MODE || 'test').toLowerCase();
  return mode === 'live'
    ? 'https://app.paydunya.com/api/v1'
    : 'https://app.paydunya.com/sandbox-api/v1';
}

function getPaydunyaHeaders() {
  const masterKey = process.env.PAYDUNYA_MASTER_KEY;
  const privateKey = process.env.PAYDUNYA_PRIVATE_KEY;
  const token = process.env.PAYDUNYA_TOKEN;

  if (!masterKey || !privateKey || !token) {
    throw new Error('Clés PayDunya manquantes dans les variables Netlify.');
  }

  return {
    'Content-Type': 'application/json',
    'PAYDUNYA-MASTER-KEY': masterKey,
    'PAYDUNYA-PRIVATE-KEY': privateKey,
    'PAYDUNYA-TOKEN': token,
  };
}

function verifyPaydunyaHash(receivedHash) {
  const masterKey = process.env.PAYDUNYA_MASTER_KEY;
  if (!masterKey || !receivedHash) return false;

  const expected = crypto.createHash('sha512').update(masterKey).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(String(receivedHash), 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function parseWebhookBody(body) {
  if (!body) return null;

  const params = new URLSearchParams(body);
  const raw = params.get('data');
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

/**
 * Détermine l'origine autorisée à partir de l'en-tête Origin de la requête.
 * On accepte le domaine du site ainsi que les déploiements *.netlify.app
 * (previews). Toute autre origine reçoit l'URL du site par défaut, ce qui
 * empêche un site tiers d'appeler ces fonctions depuis un navigateur.
 */
function resolveAllowedOrigin(requestOrigin) {
  if (!requestOrigin) return SITE_URL;
  try {
    const { hostname, origin } = new URL(requestOrigin);
    if (origin === SITE_URL) return origin;
    if (hostname.endsWith('.netlify.app')) return origin;
  } catch {
    /* origine malformée : on retombe sur SITE_URL */
  }
  return SITE_URL;
}

function corsHeaders(requestOrigin) {
  return {
    'Access-Control-Allow-Origin': resolveAllowedOrigin(requestOrigin),
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
}

const AMOUNTS = {
  XOF: 1000,
  XAF: 1000,
  GNF: 9000,
  USD: 2,
  GHS: 3,
  NGN: 1250,
  EUR: 2,
  CHF: 2,
  CAD: 3,
  GBP: 2,
  MAD: 16,
  DZD: 205,
  TND: 5,
};

function getAmountForCurrency(devise) {
  return AMOUNTS[devise] || 1000;
}

async function createCheckoutInvoice({ amount, devise, description, channels, customer, customData }) {
  const payload = {
    invoice: {
      total_amount: amount,
      description,
      channels: channels && channels.length ? channels : undefined,
      customer,
      custom_data: customData,
    },
    store: {
      name: 'WeurFarme',
      tagline: 'Fiches agricoles pour le Sénégal',
      website_url: SITE_URL,
    },
    actions: {
      callback_url: `${SITE_URL}/.netlify/functions/webhook-paydunya`,
      return_url: `${SITE_URL}/dashboard.html`,
      cancel_url: `${SITE_URL}/paiement.html`,
    },
  };

  const res = await fetch(`${getPaydunyaBaseUrl()}/checkout-invoice/create`, {
    method: 'POST',
    headers: getPaydunyaHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.response_code !== '00') {
    throw new Error(data.response_text || 'Impossible de créer la facture PayDunya.');
  }

  return {
    checkoutUrl: data.response_text,
    token: data.token,
  };
}

async function confirmInvoiceToken(invoiceToken) {
  const res = await fetch(`${getPaydunyaBaseUrl()}/checkout-invoice/confirm/${invoiceToken}`, {
    method: 'GET',
    headers: getPaydunyaHeaders(),
  });

  return res.json();
}

module.exports = {
  SITE_URL,
  AMOUNTS,
  getAmountForCurrency,
  getPaydunyaBaseUrl,
  verifyPaydunyaHash,
  parseWebhookBody,
  jsonResponse,
  corsHeaders,
  createCheckoutInvoice,
  confirmInvoiceToken,
};
