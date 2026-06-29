/**
 * WeurFarme – Client Supabase partagé
 * Prérequis : SDK Supabase (CDN) + config.js chargés avant ce script
 */
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
