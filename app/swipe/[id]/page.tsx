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
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    // Fetch details from Google Places API
    const detailsRes = await fetch(
      `https://places.googleapis.com/v1/places/${id}?fields=rating,priceLevel,currentOpeningHours,photos,location`,
      {
        headers: new Headers({
          "X-Goog-Api-Key": apiKey ?? "",
        }),
      }
    );
    const details = await detailsRes.json();

    // Get photo reference and build photo URL
    let image = "/placeholder.svg?height=400&width=600";
    if (details.photos && details.photos.length > 0) {
      const photoRef = details.photos[0].name;
      // See: https://developers.google.com/maps/documentation/places/web-service/place-photos
      image = `https://places.googleapis.com/v1/${photoRef}/media?maxWidthPx=600&maxHeightPx=400&key=${apiKey}`;
    }

    // Calculate straight line distance if location is available
    let straightLineDistanceMeters = Math.floor(Math.random() * 5000) + 500;
    if (details.location && details.location.latitude && details.location.longitude) {
      // Haversine formula
      const toRad = (v: number) => (v * Math.PI) / 180;
      const R = 6371000; // meters
      const dLat = toRad(details.location.latitude - lat);
      const dLng = toRad(details.location.longitude - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) *
          Math.cos(toRad(details.location.latitude)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      straightLineDistanceMeters = R * c;
    }

    return {
      rating: details.rating ?? Math.round(Math.random() * 2 + 3),
      priceRange: details.priceLevel ?? Math.floor(Math.random() * 3) + 1,
      straightLineDistanceMeters,
      currentOpeningHours:
        details.currentOpeningHours?.periods?.[0]?.open?.hour !== undefined
          ? `${details.currentOpeningHours.periods[0].open.hour}:00 - ${details.currentOpeningHours.periods[0].close?.hour ?? "?"}:00`
          : "9am - 9pm",
      image,
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
        image: details.image,
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
