"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Star } from "lucide-react";
import { useState, useRef } from "react";

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string[];
    priceRange?: string;
    rating?: number;
    distance?: string;
    hours: string;
    image: string;
  };
  onSwipe: (direction: "left" | "right") => void;
  style?: React.CSSProperties;
}

export function RestaurantCard({
  restaurant,
  onSwipe,
  style,
}: RestaurantCardProps) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number, clientY: number) => {
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!dragStart) return;

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!dragStart) return;

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      onSwipe(dragOffset.x > 0 ? "right" : "left");
    }

    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        transition: isDragging
          ? "none"
          : "transform 0.3s ease, opacity 0.3s ease",
        opacity,
        ...style,
      }}
      onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
      onMouseMove={(e) => isDragging && handleDragMove(e.clientX, e.clientY)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) =>
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
      }
      onTouchMove={(e) =>
        isDragging && handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
      }
      onTouchEnd={handleDragEnd}
    >
      <Card className="h-full overflow-hidden">
        <div className="relative h-2/3">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {dragOffset.x > 50 && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="text-6xl font-bold text-primary rotate-[-20deg]">
                LIKE
              </div>
            </div>
          )}
          {dragOffset.x < -50 && (
            <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
              <div className="text-6xl font-bold text-destructive rotate-[20deg]">
                PASS
              </div>
            </div>
          )}
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start flex-col justify-between gap-2">
              <h3 className="text-2xl font-bold leading-tight">
                {restaurant.name}
              </h3>
              <div className="flex flex-row gap-1 flex-wrap">
                {restaurant.cuisine.map((c) => (
                  <Badge variant="secondary" key={c} className="text-nowrap">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {restaurant.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>{restaurant.rating}</span>
                </div>
              )}
              {restaurant.priceRange && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{restaurant.priceRange}</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
