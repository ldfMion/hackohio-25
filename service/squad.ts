"use server";

import { createClient } from "@/lib/supabase/server";
import { SupabaseClient, User } from "@supabase/supabase-js";

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

export async function addUserToSquad(
  supabase: SupabaseClient,
  user: User,
  groupId: string,
) {
  const { data, error: findError } = await supabase
    .from("roster")
    .select()
    .eq("squad_id", groupId)
    .eq("user_id", user.id);
  if (findError) {
    throw findError;
  }
  if (data!.length <= 0) {
    const { error } = await supabase
      .from("roster")
      .insert({ squad_id: groupId, user_id: user.id });
    if (error) {
      throw error;
    }
  }
}

export async function getSquad(supabase: SupabaseClient, squadId: string) {
  const { data, error } = await supabase
    .from("squad")
    .select()
    .eq("id", squadId);
  if (error) {
    throw error;
  }
  if (data.length == 0) {
    throw new Error("No squad with id " + squadId + " found");
  }
  return data[0] as Squad;
}

type Squad = {
  id: string;
  latitude: number;
  longitude: number;
};

export async function getUsersFromSquad(
  supabase: SupabaseClient,
  squadId: string,
) {
  const { data, error } = await supabase
    .from("roster")
    .select()
    .eq("squad_id", squadId);
  if (error) {
    throw error;
  }
  return data as { user_id: string }[];
}
