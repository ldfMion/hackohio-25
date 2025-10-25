"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Heart } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const CUISINE_TYPES = [
  "Italian",
  "Japanese",
  "Mexican",
  "Chinese",
  "Thai",
  "Indian",
  "American",
  "French",
  "Mediterranean",
  "Korean",
];

const DIETARY_PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
];

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  const [priceRange, setPriceRange] = useState([1, 3]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [openNow, setOpenNow] = useState(false);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine],
    );
  };

  const toggleDietary = (dietary: string) => {
    setSelectedDietary((prev) =>
      prev.includes(dietary)
        ? prev.filter((d) => d !== dietary)
        : [...prev, dietary],
    );
  };

  const handleStartSwiping = () => {
    router.push(`/swipe/${groupId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Group {groupId}</h1>
              <p className="text-xs text-muted-foreground">
                Set your preferences
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Users className="w-4 h-4 mr-2" />3
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto pb-24">
        <div className="max-w-md mx-auto space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Your Preferences</h2>
              <p className="text-sm text-muted-foreground">
                These are private and only visible to you
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Price Range</Label>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{"$".repeat(priceRange[0])}</span>
                  <span className="text-muted-foreground">to</span>
                  <span className="text-2xl">{"$".repeat(priceRange[1])}</span>
                </div>
                <Slider
                  min={1}
                  max={4}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label>Cuisine Types</Label>
                <div className="flex flex-wrap gap-2">
                  {CUISINE_TYPES.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={
                        selectedCuisines.includes(cuisine)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleCuisine(cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Dietary Restrictions</Label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_PREFERENCES.map((dietary) => (
                    <Badge
                      key={dietary}
                      variant={
                        selectedDietary.includes(dietary)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleDietary(dietary)}
                    >
                      {dietary}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Open Now</Label>
                  <p className="text-xs text-muted-foreground">
                    Only show restaurants currently open
                  </p>
                </div>
                <Switch checked={openNow} onCheckedChange={setOpenNow} />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Ready to find matches?</h3>
                <p className="text-sm text-muted-foreground">
                  Start swiping through restaurants
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="max-w-md mx-auto">
          <Button className="w-full" size="lg" onClick={handleStartSwiping}>
            Start Swiping
          </Button>
        </div>
      </div>
    </div>
  );
}
