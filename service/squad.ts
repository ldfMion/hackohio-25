"use server";

import { createClient } from "@/lib/supabase/server";

export async function createSquad(latitude: number, longitude: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("squad")
    .insert({ latitude: latitude, longitude: longitude })
    .select();

  if (error || data == null) {
    throw new Error("Error creating squad:", error);
  }

  return data as Squad[];
}

type Squad = {
  id: string;
  latitude: number;
  longitude: number;
};
