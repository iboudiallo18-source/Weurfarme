/**
 * Génère config.js au déploiement Netlify à partir des variables d'environnement.
 * À la racine du projet pour faciliter l'upload sur GitHub.
 */
const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

if (!url || !key) {
  console.warn(
    '⚠️  SUPABASE_URL ou SUPABASE_ANON_KEY manquant(s). ' +
    'Ajoutez-les dans Netlify → Environment variables.'
  );
}

const contenu = `/**
 * Généré automatiquement au déploiement Netlify — ne pas éditer sur le serveur.
 */
const SUPABASE_URL      = '${url}';
const SUPABASE_ANON_KEY = '${key}';
const AI_ASSISTANT_FUNCTION = 'ask-assistant';
`;

fs.writeFileSync(path.join(__dirname, 'config.js'), contenu, 'utf8');
console.log('✅ config.js généré pour le déploiement.');
