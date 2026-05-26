import { createClient } from '@supabase/supabase-js';

const url = 'https://lbllasgphxxxwieahgvj.supabase.co';
const key = 'sb_publishable_Tj3r9AoQmoW1TtRs6mN1Mg_RP_7y2z5';

export const isSupabaseConfigured = true;

export const supabase = createClient(url, key);

export interface ProjectRow {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  images: string[];
  description: string;
  tags: string[];
  created_at: string;
  published: boolean;
}
