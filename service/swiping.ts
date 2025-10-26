import { createClient } from "@/lib/supabase/server";
import { addUserToSquad, getSquad } from "./squad";
import { SupabaseClient } from "@supabase/supabase-js";
import { getRestaurants } from "@/lib/places";

export async function processSwipingStart(squadId: string) {
  const supabase = await createClient();
  await addUserToSquad(supabase, squadId);
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
    newRestaurants,
    squadId
  );
  console.log("added restaurants");
  console.log(addedRestaurants);
  return addedRestaurants;
}

async function getSavedRestaurants(supabase: SupabaseClient, squadId: string) {
  const { data, error } = await supabase
    .from("restaurant")
    .select(`id`)
    .eq("squad_id", squadId);
  if (error) {
    throw error;
  }

  return data as { id: string }[];
}

async function saveRestaurants(
  supabase: SupabaseClient,
  restaurants: Readonly<{ id: string }[]>,
  squadId: string
) {
  const { data, error } = await supabase
    .from("restaurant")
    .upsert(restaurants.map((r) => ({ squad_id: squadId, id: r.id })))
    .select();
  return data as Restaurant[];
}

async function saveSwipe(
  supabase: SupabaseClient,
  squadId: string,
  restaurantId: string,
  swipe: Swipe
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || user === null) {
    throw new Error(`Error fetching current user: ${userError?.message}`);
  }

  const savedSwipe = await supabase.from("swipe").insert({
    user_id: user.id,
    squad_id: squadId,
    restaurant_id: restaurantId,
    swipe: swipe,
  });
}

type Restaurant = {
  id: string;
  created_at: string;
  squad_id: string;
};

enum Swipe {
  Left,
  Right,
  Skip,
}
