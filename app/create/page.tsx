"use client";

import { DatePicker } from "@/components/date-picker";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { createSquad } from "@/service/squad";
import { ArrowLeft, Copy, Check, Share2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreateGroupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const groupName = searchParams.get("name") || "";

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  // Generate group link once
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => setLocationError(err.message),
    );
  }, [groupName]);

  const handleCreateGroup = async () => {
    console.log("handleCreateGroup");
    console.log(location);
    if (location) {
      const squad = (await createSquad(location.lat, location.lng))[0];
      console.log(squad);
      router.push(`${window.location.origin}/group/${squad.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/home">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Group</h1>
      </Navbar>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{groupName}</h2>
              <p className="text-muted-foreground">
                Set up your group dining preferences
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <div>
                  {!location && !locationError && (
                    <p className="text-muted-foreground">
                      <Spinner /> Getting your location...
                    </p>
                  )}
                  {location && JSON.stringify(location)}
                  {locationError && <p>{locationError}</p>}
                </div>
              </div>

              <div>
                <DatePicker date={date} setDate={setDate} />
              </div>
              <p className="text-xs text-muted-foreground">
                We'll only show restaurants available at this time
              </p>
            </div>
          </Card>

          <Button
            className="w-full"
            size="lg"
            onClick={handleCreateGroup}
            disabled={!location}
          >
            Create Group & Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
