"use server";
import { createClient } from "@/lib/supabase/server";
import { addUserToSquad, getSquad } from "./squad";
import { getRestaurants } from "@/lib/places";
import { getSavedRestaurants, saveRestaurants } from "./restaurant";
import { SupabaseClient } from "@supabase/supabase-js";

export async function processSwipingStart(squadId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("user is null");
  }
  await addUserToSquad(supabase, user, squadId);
  const squad = await getSquad(supabase, squadId);
  const savedRestaurants = await getSavedRestaurants(supabase, squadId);
  if (savedRestaurants.length > 0) {
    return savedRestaurants;
  }
  const newRestaurants = await getRestaurants(squad.latitude, squad.longitude);
  console.log("new restaurants");
  console.log(newRestaurants);
  const addedRestaurants = await saveRestaurants(
    supabase,
    newRestaurants.map((r) => ({ id: r.id, data: r })),
    squadId
  );
  console.log("added restaurants");
  console.log(addedRestaurants);
  return addedRestaurants;
}

export async function saveSwipe(
  squadId: string,
  restaurantId: string,
  swipe: Swipe
) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || user === null) {
    throw new Error(`Error fetching current user: ${userError?.message}`);
  }

  const { error } = await supabase.from("swipe").insert({
    user_id: user.id,
    squad_id: squadId,
    restaurant_id: restaurantId,
    swipe: swipe,
  });

  if (error) {
    throw new Error(`Error saving swipe: ${error.message}`);
  }
}

async function getAllSwipesForSquad(supabase: SupabaseClient, squadId: string) {
  const { data, error } = await supabase
    .from("swipe")
    .select(
      `
      id,
      user_id,
      squad_id,
      restaurant_id,
      swipe,
      created_at
    `
    )
    .eq("squad_id", squadId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching swipes: ${error.message}`);
  }

  return data;
}

type Swipe = "left" | "right";
