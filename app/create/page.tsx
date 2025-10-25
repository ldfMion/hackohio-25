"use client";

import { DatePicker } from "@/components/date-picker";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Generate group link once
  useEffect(() => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const url = `${window.location.origin}/group/${code}`;
    setShareUrl(url);

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

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Join ${groupName}`,
        text: "Join this group to collaborate on dining plans!",
        url: shareUrl,
      });
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleCreateGroup = () => {
    router.push(shareUrl);
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

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Share with your group</h3>
              <p className="text-sm text-muted-foreground">
                Share this link with friends so they can join your group
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-lg p-3 overflow-hidden">
                <p className="text-sm font-mono text-center truncate">
                  {shareUrl}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyUrl}
                  className="h-12 w-12"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>

                {navigator.canShare && navigator.canShare() && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                    className="h-12 w-12"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
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
