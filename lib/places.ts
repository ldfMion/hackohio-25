"use server";

export async function getRestaurants(lat: number, lng: number) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  console.log(apiKey);
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.types,places.websiteUri,places.id",
      },
      body: JSON.stringify({
        includedTypes: ["restaurant"],
        maxResultCount: 100,
        locationRestriction: {
          circle: {
            center: {
              latitude: lat,
              longitude: lng,
            },
            radius: 1000.0,
          },
        },
      }),
    },
  );
  return await response.json();
}
