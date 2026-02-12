import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fstsrhzqunamldgsiweo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdHNyaHpxdW5hbWxkZ3Npd2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjM2ODEsImV4cCI6MjA4NjM5OTY4MX0.fJkvBkhtxyc_xadI6ifRbYUQadAPj8RRZg-FoCqUmEs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
