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
  // Map Google Places data to expected restaurant card props
  const restaurants: SwipeRestaurant[] = firstFive.map((place) => ({
    id: place.id,
    name: place.displayName?.text ?? "Unknown Name",
    image: "/placeholder.svg?height=400&width=600",
    cuisine: "Unknown",
    priceRange: 2,
    rating: 4.0,
    distance: "N/A",
    hours: "N/A",
  }));
  return <SwipeView restaurants={restaurants} />;
}
