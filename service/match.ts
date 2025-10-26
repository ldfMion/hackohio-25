import { createClient } from "@/lib/supabase/server";
import { getSavedRestaurants, Restaurant } from "./restaurant";
import { getUsersFromSquad } from "./squad";
import { getAllSwipesForGroup } from "./swiping";

export async function getMatches(groupId: string): Promise<{
  perfectMatches: RestaurantMatch[];
  majorityMatches: RestaurantMatch[];
  numUsers: number;
}> {
  const supabase = await createClient();
  const swipes = await getAllSwipesForGroup(supabase, groupId);
  const users = await getUsersFromSquad(supabase, groupId);
  console.log("users in squad");
  console.log(users);
  const numUsers = users.length;
  const restaurants = await getSavedRestaurants(supabase, groupId);
  const restaurantsWithVotes = restaurants.map((r) => {
    const swipesForRestaurant = swipes.filter((s) => s.restaurant_id == r.id);
    return {
      ...r,
      image: `https://places.googleapis.com/v1/${r.data.photos![0].name}/media?maxWidthPx=600&maxHeightPx=400&key=${process.env.GOOGLE_PLACES_API_KEY}`,
      votes: swipesForRestaurant.map((s) => ({
        user: s.user_id,
        direction: s.swipe,
      })),
      likes: swipesForRestaurant.filter((s) => s.swipe == "right").length,
      dislikes: swipesForRestaurant.filter((s) => s.swipe == "left").length,
    };
  });
  console.log(restaurantsWithVotes);
  console.log("num users", numUsers);
  return {
    perfectMatches: restaurantsWithVotes.filter(
      (r) => r.votes.length == numUsers,
    ),
    majorityMatches: restaurantsWithVotes.filter(
      (r) => r.votes.length > numUsers / 2,
    ),
    numUsers,
  };
}

export type RestaurantMatch = Restaurant & {
  image: string;
  votes: {
    user: string;
    direction: "right" | "left";
  }[];
};
