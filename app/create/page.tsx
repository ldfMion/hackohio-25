"use client";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, Copy, Check } from "lucide-react";
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [groupCode, setGroupCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate a random 6-character group code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGroupCode(code);

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
  }, []);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(groupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateGroup = () => {
    router.push(`/group/${groupCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/home">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Create Group</h1>
        </div>
      </header>

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

              <div className="">
                <DatePicker date={date} setDate={setDate} />
              </div>
              <p className="text-xs text-muted-foreground">
                We'll only show restaurants available at this time
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Share with your group</h3>
              <p className="text-sm text-muted-foreground">
                Share this code with friends so they can join
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-lg p-4 text-center">
                <p className="text-3xl font-bold font-mono tracking-widest">
                  {groupCode}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
                className="h-14 w-14 bg-transparent"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </Button>
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
