'use client';

import { createClient } from '@supabase/supabase-js';

function supabase() {
  'use client';
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
  );
}

export default supabase;
