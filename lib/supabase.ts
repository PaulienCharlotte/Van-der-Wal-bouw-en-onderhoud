import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? '';
const key = process.env.SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = url.startsWith('https://') && key.length > 20;

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key',
);

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
