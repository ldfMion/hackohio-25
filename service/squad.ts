"use server";

import { createClient } from "@/lib/supabase/server";

export async function handleSquadCreation(latitude: number, longitude: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || user === null) {
    throw new Error(`Error fetching current user: ${userError?.message}`);
  }

  const { data, error } = await supabase
    .from("squad")
    .insert({ latitude: latitude, longitude: longitude })
    .select();

  if (error || data == null) {
    throw new Error("Error creating squad:", error);
  }

  const squadId = (data as Squad[])[0].id;

  const { error: rosterError } = await supabase.from("roster").insert({
    squad_id: squadId,
    user_id: user.id,
  });

  if (rosterError) {
    throw new Error(`Error adding user to roster: ${rosterError.message}`);
  }

  return data as Squad[];
}

type Squad = {
  id: string;
  latitude: number;
  longitude: number;
};
