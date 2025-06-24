import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hooplrtvvjtccofvadko.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvb3BscnR2dmp0Y2NvZnZhZGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDQyNDQsImV4cCI6MjA2NjMyMDI0NH0.eii4cgUcrZsU7Qb6fXrdaq6xcNkPRC7OX3fgkvqaAL0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
