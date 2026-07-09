async function getUserFromJwt(jwt) {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('SUPABASE_URL ou SUPABASE_ANON_KEY manquant.');
  }

  const res = await fetch(`${url}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      apikey: anonKey,
    },
  });

  if (!res.ok) return null;
  return res.json();
}

async function activerAbonnement(userId, extraMetadata = {}) {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY manquant pour activer l'abonnement.");
  }

  const current = await fetch(`${url}/auth/v1/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
    },
  });

  let existingMeta = {};
  if (current.ok) {
    const user = await current.json();
    existingMeta = user.user_metadata || {};
  }

  const res = await fetch(`${url}/auth/v1/admin/users/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_metadata: {
        ...existingMeta,
        ...extraMetadata,
        abonne: true,
        abonne_le: new Date().toISOString(),
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Échec activation abonnement : ${err}`);
  }

  return res.json();
}

module.exports = {
  getUserFromJwt,
  activerAbonnement,
};
