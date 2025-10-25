"use client";

import { Navbar } from "@/components/navbar";
import { RestaurantCard } from "@/components/restaurant-card";
import { RotateCcw, X, Heart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Bella Italia",
    cuisine: "Italian",
    priceRange: 2,
    rating: 4.5,
    distance: "0.5 miles away",
    hours: "Open until 10:00 PM",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    name: "Sushi Palace",
    cuisine: "Japanese",
    priceRange: 3,
    rating: 4.8,
    distance: "1.2 miles away",
    hours: "Open until 11:00 PM",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    priceRange: 1,
    rating: 4.3,
    distance: "0.8 miles away",
    hours: "Open until 9:00 PM",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    name: "Le Petit Bistro",
    cuisine: "French",
    priceRange: 4,
    rating: 4.7,
    distance: "2.1 miles away",
    hours: "Open until 10:30 PM",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    name: "Spice Garden",
    cuisine: "Indian",
    priceRange: 2,
    rating: 4.6,
    distance: "1.5 miles away",
    hours: "Open until 10:00 PM",
    image: "/placeholder.svg?height=400&width=600",
  },
];

export function SwipeView({ restaurantIds }: { restaurantIds: string[] }) {
  console.log("restaurantIds", restaurantIds);
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedRestaurants, setSwipedRestaurants] = useState<
    Array<{ id: string; direction: "left" | "right" }>
  >([]);

  const currentRestaurant = MOCK_RESTAURANTS[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (!currentRestaurant) return;

    setSwipedRestaurants([
      ...swipedRestaurants,
      { id: currentRestaurant.id, direction },
    ]);

    if (currentIndex < MOCK_RESTAURANTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push(`/results/${groupId}`);
    }
  };

  const handleUndo = () => {
    if (swipedRestaurants.length === 0) return;
    setSwipedRestaurants(swipedRestaurants.slice(0, -1));
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  if (!currentRestaurant) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-xl font-semibold">Group {groupId}</h1>
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} / {MOCK_RESTAURANTS.length}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={swipedRestaurants.length === 0}
            className="bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Undo
          </Button>
        </div>
      </Navbar>

      <main className="flex-1 p-4 flex items-center justify-center">
        <div className="max-w-md w-full aspect-[3/4] relative">
          {MOCK_RESTAURANTS.slice(currentIndex, currentIndex + 2).map(
            (restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSwipe={handleSwipe}
                style={{
                  zIndex: 2 - index,
                  scale: 1 - index * 0.05,
                }}
              />
            ),
          )}
        </div>
      </main>

      <div className="p-4 pb-8">
        <div className="max-w-md mx-auto flex items-center justify-center gap-6">
          <Button
            size="icon"
            variant="outline"
            className="w-16 h-16 rounded-full bg-background"
            onClick={() => handleSwipe("left")}
          >
            <X className="w-8 h-8 text-destructive" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="w-20 h-20 rounded-full bg-background"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="w-10 h-10 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
