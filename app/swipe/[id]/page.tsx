import { processSwipingStart } from "@/service/swiping";
import { SwipeView, SwipeRestaurant } from "./swipe-view";

export default async function TempSwipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const squadId = (await params).id;
  const restaurants = await processSwipingStart(squadId);
  console.log(restaurants);

  // Fetch details for all restaurants in parallel
  const mappedRestaurants: SwipeRestaurant[] = await Promise.all(
    restaurants.map((restaurant) => {
      // Convert meters to miles (1 mile = 1609.34 meters)
      return {
        id: restaurant.id,
        name: restaurant.data.displayName.text,
        image: "/placeholder.svg?height=400&width=600",
        cuisine: restaurant.data.types.join("'"),
        priceRange: restaurant.data.priceLevel,
        rating: restaurant.data.rating,
        distance: "N/A",
        hours: "N/A",
      };
    }),
  );
  return <SwipeView restaurants={mappedRestaurants} />;
}
