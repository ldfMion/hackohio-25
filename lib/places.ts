"use server";

export async function getRestaurants(lat: number, lng: number) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.types,places.websiteUri,places.id,places.photos,places.rating,places.priceRange,places.priceLevel",
      },
      body: JSON.stringify({
        includedTypes: ["restaurant"],
        maxResultCount: 20,
        rankPreference: "POPULARITY",
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

export interface PlacesResponse {
  places: Place[];
}

export interface Place {
  id: string;
  types: string[];
  formattedAddress: string;
  rating: number;
  websiteUri?: string;
  priceLevel?: string;
  displayName: DisplayName;
  photos?: Photo[];
  priceRange?: PriceRange;
}

export interface DisplayName {
  text: string;
  languageCode: string;
}

export interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttribution[];
  flagContentUri: string;
  googleMapsUri: string;
}

export interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri?: string;
}

export interface PriceRange {
  startPrice: Price;
  endPrice: Price;
}

export interface Price {
  currencyCode: string;
  units: string;
}
