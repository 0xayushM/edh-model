import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate Supabase configuration
const isValidUrl = supabaseUrl && supabaseUrl.includes('.supabase.co') && !supabaseUrl.includes('your-project-id');
const isValidKey = supabaseAnonKey && supabaseAnonKey.startsWith('eyJ') && !supabaseAnonKey.includes('your-anon-key');

if (!isValidUrl || !isValidKey) {
  console.warn('⚠️ Supabase credentials not configured correctly:');
  if (!isValidUrl) {
    console.warn('  - NEXT_PUBLIC_SUPABASE_URL is invalid or missing');
    console.warn('    Current value:', supabaseUrl || '(empty)');
  }
  if (!isValidKey) {
    console.warn('  - NEXT_PUBLIC_SUPABASE_ANON_KEY is invalid or missing');
    console.warn('    Expected format: JWT token starting with "eyJ"');
    console.warn('    Current value starts with:', supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : '(empty)');
    console.warn('    ⚠️ Note: Use the "anon" or "public" key, NOT the publishable key!');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return isValidUrl && isValidKey;
};
