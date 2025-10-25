import { processSwipingStart } from "@/service/swiping";
import { SwipeView } from "./swipe-view";

export default async function TempSwipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const squadId = (await params).id;
  const restaurants = await processSwipingStart(squadId);
  return <SwipeView restaurantIds={restaurants.map((r) => r.id)} />;
}
