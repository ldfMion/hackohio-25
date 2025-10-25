import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient();

async function createSquad(latitude: number, longitude: number) {
  const { data, error } = await supabase
    .from("squad")
    .insert({ latitude: latitude, longitude: longitude });

  if (error) {
    console.error("Error creating squad:", error);
    return null;
  }

  return data;
}
