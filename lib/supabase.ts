import { createClient } from '@supabase/supabase-js';

const url: string = (import.meta.env.SUPABASE_URL as string) ?? '';
const key: string = ((import.meta.env.SUPA_ANON_DATABASE_REALISATIE ?? import.meta.env.SUPABASE_ANON_KEY) as string) ?? '';

export const isSupabaseConfigured = url.startsWith('https://') && key.length > 20;

export const supabase = createClient(
  isSupabaseConfigured ? url : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? key : 'placeholder-key',
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
