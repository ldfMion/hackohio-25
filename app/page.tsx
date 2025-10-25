import { Button } from "@/components/ui/button";
import { Users, MapPin, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <Image
          src="/images/Where2Eat.png"
          alt="Where 2 Eat Logo"
          width={160} // Increased width
          height={160} // Increased height
          className="w-16 h-16 object-contain" // Ensures the image fits within the top bar height
        />
        <h1 className="text-2xl font-bold">Where2Eat</h1>
      </Navbar>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-balance">
              Find the perfect restaurant together
            </h2>
            <p className="text-muted-foreground text-balance">
              Swipe with your group and discover where everyone wants to eat
            </p>
          </div>

          <Button asChild className="w-full" size="lg">
            <Link href="create">Create Group</Link>
          </Button>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Create groups</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Swipe together</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Find matches</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
