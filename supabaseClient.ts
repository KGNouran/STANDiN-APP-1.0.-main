import { createClient } from '@supabase/supabase-js';

// Diese Werte kommen aus dem Supabase Projekt-Dashboard (Settings -> API)
const supabaseUrl = import.meta.env.local.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.local.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
