export function parseTypes(types: string[]) {
  const normalized = types.map((t) => t.toLowerCase());

  const cuisineMap: Record<string, string> = {
    pizza_restaurant: "Pizza",
    chinese_restaurant: "Chinese",
    fast_food_restaurant: "Fast Food",
    hamburger_restaurant: "Burgers",
    donut_shop: "Donuts & Coffee",
    coffee_shop: "Coffee & Cafe",
    breakfast_restaurant: "Breakfast & Brunch",
    brunch_restaurant: "Brunch",
    bakery: "Bakery & Pastries",
    american_restaurant: "American",
    sandwich_shop: "Sandwiches",
    cafe: "Cafe",
    bar: "Bar or Pub",
    chicken_restaurant: "Chicken",
    diner: "Diner",
    dessert_shop: "Desserts",
    catering_service: "Catering",
    confectionery: "Sweets & Candy",
  };

  // Collect all cuisines that match the known type mappings
  const cuisines = Object.entries(cuisineMap)
    .filter(([key]) => normalized.includes(key))
    .map(([, label]) => label);

  // If nothing found, provide reasonable generic fallbacks
  if (cuisines.length === 0) {
    if (normalized.includes("restaurant")) cuisines.push("Restaurant");
    if (normalized.includes("food")) cuisines.push("Food & Drinks");
  }

  // Remove duplicates and return
  return [...new Set(cuisines)];
}
