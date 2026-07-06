/**
 * WeurFarme — exemple de configuration front-end (public).
 *
 * En production, ce fichier est GÉNÉRÉ automatiquement au déploiement par
 * build-config.js à partir des variables d'environnement Netlify. Ne le
 * committez pas rempli : config.js est ignoré par git.
 *
 * Pour un test en local, copiez ce fichier en `config.js` et renseignez :
 *
 *   const SUPABASE_URL      = 'https://VOTRE-PROJET.supabase.co';
 *   const SUPABASE_ANON_KEY = 'votre-cle-anon-publique';
 *
 * La clé "anon" Supabase est publique (destinée au navigateur). Ne mettez
 * JAMAIS ici la SERVICE_ROLE_KEY ni aucune clé serveur (PayDunya, Gemini) :
 * celles-ci vivent uniquement dans les variables d'environnement Netlify et
 * ne sont lues que par les fonctions serverless.
 *
 * Variables d'environnement attendues côté serveur (Netlify → Environment) :
 *   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
 *   PAYDUNYA_MASTER_KEY, PAYDUNYA_PRIVATE_KEY, PAYDUNYA_TOKEN, PAYDUNYA_MODE
 *   GEMINI_API_KEY
 */
