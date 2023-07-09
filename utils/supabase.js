import { createClient } from '@supabase/supabase-js';

const getSupabase = () => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false } });

  return supabase;
};

export { getSupabase };
