"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Heart,
  Users,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const PERFECT_MATCHES = [
  {
    id: "1",
    name: "Bella Italia",
    cuisine: "Italian",
    priceRange: 2,
    rating: 4.5,
    distance: "0.5 miles away",
    hours: "Open until 10:00 PM",
    image: "/placeholder.svg?height=300&width=400",
    votes: 3,
    totalMembers: 3,
  },
];

const MAJORITY_MATCHES = [
  {
    id: "2",
    name: "Sushi Palace",
    cuisine: "Japanese",
    priceRange: 3,
    rating: 4.8,
    distance: "1.2 miles away",
    hours: "Open until 11:00 PM",
    image: "/placeholder.svg?height=300&width=400",
    votes: 2,
    totalMembers: 3,
  },
  {
    id: "5",
    name: "Spice Garden",
    cuisine: "Indian",
    priceRange: 2,
    rating: 4.6,
    distance: "1.5 miles away",
    hours: "Open until 10:00 PM",
    image: "/placeholder.svg?height=300&width=400",
    votes: 2,
    totalMembers: 3,
  },
];

interface RestaurantResultProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string;
    priceRange: number;
    rating: number;
    distance: string;
    hours: string;
    image: string;
    votes: number;
    totalMembers: number;
    voters?: Array<{
      user: string;
      direction: "right" | "left";
    }>;
  };
  isPerfectMatch?: boolean;
}

function RestaurantResult({
  restaurant,
  isPerfectMatch = false,
}: RestaurantResultProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight">{restaurant.name}</h3>
              {isPerfectMatch && (
                <PartyPopper className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {restaurant.cuisine}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <DollarSign className="w-3 h-3" />
                <span>{"$".repeat(restaurant.priceRange)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{restaurant.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{restaurant.hours}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Users className="w-3 h-3 text-primary" />
            <span className="font-medium">
              {restaurant.votes}/{restaurant.totalMembers} members liked this
            </span>
          </div>
          {/* Votes by users */}
          {restaurant.voters && restaurant.voters.length > 0 && (
            <div className="mt-2 text-xs">
              <span className="font-semibold">Votes:</span>
              <ul className="ml-2">
                {restaurant.voters.map((voter) => (
                  <li key={voter.user} className="flex items-center gap-1">
                    <span>{voter.user}</span>
                    <span>
                      {voter.direction === "right" ? "👍" : "👎"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function ResultsPage() {
  const params = useParams();
  const groupId = params.id as string;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-semibold">Results</h1>
          <p className="text-sm text-muted-foreground">Group {groupId}</p>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {PERFECT_MATCHES.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <h2 className="text-lg font-semibold">Perfect Matches</h2>
              </div>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <PartyPopper className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Everyone agrees!</h3>
                    <p className="text-sm text-muted-foreground">
                      All {PERFECT_MATCHES[0].totalMembers} members liked these
                      restaurants
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {PERFECT_MATCHES.map((restaurant) => (
                    <RestaurantResult
                      key={restaurant.id}
                      restaurant={restaurant}
                      isPerfectMatch
                    />
                  ))}
                </div>
              </Card>
            </div>
          )}

          {MAJORITY_MATCHES.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Majority Picks</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Most of your group liked these options
              </p>
              <div className="space-y-3">
                {MAJORITY_MATCHES.map((restaurant) => (
                  <RestaurantResult
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            </div>
          )}

          {PERFECT_MATCHES.length === 0 && MAJORITY_MATCHES.length === 0 && (
            <Card className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">No matches yet</h3>
                <p className="text-sm text-muted-foreground">
                  Keep swiping or adjust your preferences to find restaurants
                  everyone likes
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="max-w-md mx-auto flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" asChild>
            <Link href={`/swipe/${groupId}`}>Swipe More</Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href="/">New Group</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
