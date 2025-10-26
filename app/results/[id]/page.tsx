import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Star, Heart, Users, PartyPopper } from "lucide-react";
import Link from "next/link";
import { getMatches, RestaurantMatch } from "@/service/match";
import { parseTypes } from "@/lib/restaurant-types";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const groupId = (await params).id;
  const { majorityMatches, perfectMatches, numUsers } =
    await getMatches(groupId);
  console.log(majorityMatches);
  console.log(perfectMatches);
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
          {perfectMatches.length > 0 && (
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
                      All {perfectMatches[0].likes} members liked these
                      restaurants
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {perfectMatches.map((restaurant) => (
                    <RestaurantResult
                      key={restaurant.id}
                      restaurant={restaurant}
                      isPerfectMatch
                      numUsers={numUsers}
                    />
                  ))}
                </div>
              </Card>
            </div>
          )}

          {majorityMatches.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Majority Picks</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Most of your group liked these options
              </p>
              <div className="space-y-3">
                {majorityMatches.map((restaurant) => (
                  <RestaurantResult
                    key={restaurant.id}
                    restaurant={restaurant}
                    numUsers={numUsers}
                    isPerfectMatch={false}
                  />
                ))}
              </div>
            </div>
          )}

          {perfectMatches.length === 0 && majorityMatches.length === 0 && (
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

function RestaurantResult({
  restaurant,
  isPerfectMatch,
  numUsers,
}: {
  restaurant: RestaurantMatch;
  isPerfectMatch: boolean;
  numUsers: number;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.data.displayName.text}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight">
                {restaurant.data.displayName.text}
              </h3>
              {isPerfectMatch && (
                <PartyPopper className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {parseTypes(restaurant.data.types).map((type) => (
                <Badge variant="secondary" className="text-xs" key={type}>
                  {type}
                </Badge>
              ))}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span>{restaurant.data.rating}</span>
              </div>
              {restaurant.data.priceLevel && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign className="w-3 h-3" />
                  <span>{restaurant.data.priceLevel}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Users className="w-3 h-3 text-primary" />
            <span className="font-medium">
              {restaurant.votes.length}/{numUsers} members liked this
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
