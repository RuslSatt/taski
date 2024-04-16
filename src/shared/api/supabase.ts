import { supabaseKey, supabaseUrl } from '@/shared/api/const';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };