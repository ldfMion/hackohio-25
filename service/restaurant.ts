import { Place } from "@/lib/places";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getSavedRestaurants(
  supabase: SupabaseClient,
  squadId: string,
) {
  const { data, error } = await supabase
    .from("restaurant")
    .select()
    .eq("squad_id", squadId);
  if (error) {
    throw error;
  }

  return data as Restaurant[];
}

export async function saveRestaurants(
  supabase: SupabaseClient,
  restaurants: Readonly<{ id: string; data: Place }[]>,
  squadId: string,
) {
  console.log("saving restaurants");
  console.log(restaurants);
  const { data, error } = await supabase
    .from("restaurant")
    .insert(
      restaurants.map((r) => ({ squad_id: squadId, id: r.id, data: r.data })),
    )
    .select();
  if (error) {
    throw error;
  }
  return data as Restaurant[];
}

type Restaurant = {
  id: string;
  created_at: string;
  squad_id: string;
  data: Place;
};
