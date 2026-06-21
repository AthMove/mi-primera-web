import { createClient } from "@supabase/supabase-js";

let client: any = null;

function getSupabaseClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase browser environment variables");
  }

  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "athmov-auth-session-v2",
    },
  });

  return client;
}

export const supabase: any = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getSupabaseClient();
      return client[prop as keyof typeof client];
    },
  }
);