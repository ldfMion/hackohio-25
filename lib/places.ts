"use server";

export async function getRestaurants(lat: number, lng: number) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.id",
      },
      body: JSON.stringify({
        includedTypes: ["restaurant"],
        maxResultCount: 20,
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
  console.log(response);
  const data = (await response.json()) as PlacesResponse;
  console.log(data);
  return data.places;
}

export type PlacesResponse = Readonly<{
  places: ReadonlyArray<{
    id: string;
    displayName: Readonly<{
      text: string;
      languageCode: string;
    }>;
  }>;
}>;
