import { processSwipingStart } from "@/service/swiping";
import { getRestaurants } from "@/lib/places";
import { SwipeView, SwipeRestaurant } from "./swipe-view";

export default async function TempSwipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const squadId = (await params).id;
  // For demo, use fixed coordinates (e.g., Columbus, OH)
  const lat = 39.9612;
  const lng = -82.9988;
  const places = await getRestaurants(lat, lng);
  const firstFive = Array.isArray(places) ? places.slice(0, 5) : [];

  // New: Fetch additional details for each restaurant
  async function getRestaurantDetails(id: string) {
    // Replace with your actual API call to fetch details by id
    // Example: await fetch(`/api/restaurant-details?id=${id}`)
    // For demo, return mock data
    return {
      rating: Math.round(Math.random() * 2 + 3),
      priceRange: Math.floor(Math.random() * 3) + 1,
      straightLineDistanceMeters: Math.floor(Math.random() * 5000) + 500,
      currentOpeningHours: "9am - 9pm",
    };
  }

  // Fetch details for all restaurants in parallel
  const restaurants: SwipeRestaurant[] = await Promise.all(
    firstFive.map(async (place) => {
      const details = await getRestaurantDetails(place.id);
      // Convert meters to miles (1 mile = 1609.34 meters)
      const miles = details.straightLineDistanceMeters / 1609.34;
      return {
        id: place.id,
        name: place.displayName?.text ?? "Unknown Name",
        image: "/placeholder.svg?height=400&width=600",
        cuisine: "Unknown",
        priceRange: details.priceRange,
        rating: details.rating,
        distance: `${miles.toFixed(2)} mi`,
        hours: details.currentOpeningHours,
      };
    })
  );
  return <SwipeView restaurants={restaurants} />;
}
