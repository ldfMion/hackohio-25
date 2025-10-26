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
        image: `https://places.googleapis.com/v1/${restaurant.data.photos![0].name}/media?maxWidthPx=600&maxHeightPx=400&key=${process.env.GOOGLE_PLACES_API_KEY}`,
        cuisine: parseTypes(restaurant.data.types),
        priceRange: restaurant.data.priceLevel,
        rating: restaurant.data.rating,
        distance: "N/A",
        hours: "N/A",
      };
    }),
  );
  return <SwipeView restaurants={mappedRestaurants} />;
}

function parseTypes(types: string[]) {
  const normalized = types.map((t) => t.toLowerCase());

  const cuisineMap: Record<string, string> = {
    pizza_restaurant: "Pizza",
    chinese_restaurant: "Chinese",
    fast_food_restaurant: "Fast Food",
    hamburger_restaurant: "Burgers",
    donut_shop: "Donuts & Coffee",
    coffee_shop: "Coffee & Cafe",
    breakfast_restaurant: "Breakfast & Brunch",
    brunch_restaurant: "Brunch",
    bakery: "Bakery & Pastries",
    american_restaurant: "American",
    sandwich_shop: "Sandwiches",
    cafe: "Cafe",
    bar: "Bar or Pub",
    chicken_restaurant: "Chicken",
    diner: "Diner",
    dessert_shop: "Desserts",
    catering_service: "Catering",
    confectionery: "Sweets & Candy",
  };

  // Collect all cuisines that match the known type mappings
  const cuisines = Object.entries(cuisineMap)
    .filter(([key]) => normalized.includes(key))
    .map(([, label]) => label);

  // If nothing found, provide reasonable generic fallbacks
  if (cuisines.length === 0) {
    if (normalized.includes("restaurant")) cuisines.push("Restaurant");
    if (normalized.includes("food")) cuisines.push("Food & Drinks");
  }

  // Remove duplicates and return
  return [...new Set(cuisines)];
}
