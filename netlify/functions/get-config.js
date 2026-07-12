/**
 * Netlify Function : get-config
 * Expose uniquement les clés PUBLIQUES au frontend
 * Les clés secrètes (service_role, PayDunya) restent côté serveur
 */
exports.handler = async () => {
  const supabaseUrl     = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Configuration manquante sur le serveur.' })
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    },
    body: JSON.stringify({
      supabaseUrl,
      supabaseAnonKey
    })
  };
};
