import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const projectKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(projectUrl, projectKey);

export default supabase;
