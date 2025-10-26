import { processSwipingStart } from "@/service/swiping";
import { SwipeView, SwipeRestaurant } from "./swipe-view";
import { parseTypes } from "@/lib/restaurant-types";

export default async function TempSwipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const squadId = (await params).id;
  const restaurants = await processSwipingStart(squadId);
  console.log(restaurants);

  const mappedRestaurants: SwipeRestaurant[] = restaurants.map((restaurant) => {
    // Convert meters to miles (1 mile = 1609.34 meters)
    return {
      id: restaurant.id,
      name: restaurant.data.displayName.text,
      image: `https://places.googleapis.com/v1/${restaurant.data.photos![0].name}/media?maxWidthPx=600&maxHeightPx=400&key=${process.env.GOOGLE_PLACES_API_KEY}`,
      cuisine: parseTypes(restaurant.data.types),
      priceRange: restaurant.data.priceLevel,
      rating: restaurant.data.rating,
      distance: "N/A",
      hours: "N/A",
    };
  });
  return <SwipeView restaurants={mappedRestaurants} />;
}
