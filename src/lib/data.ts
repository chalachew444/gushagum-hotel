export type RoomTypeKey = "SINGLE" | "DOUBLE" | "SUITE" | "VIP";

export const roomSeed = [
  {
    id: "room-101",
    number: "101",
    name: "Ruby Suite",
    type: "SINGLE",
    pricePerNight: 120,
    capacity: 2,
    status: "AVAILABLE",
    description: "A warm, cozy room with a garden-facing balcony and premium bedding.",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    features: ["King Bed", "Balcony", "Private Bathroom", "Wi‑Fi"],
  },
  {
    id: "room-202",
    number: "202",
    name: "Cedar Double",
    type: "DOUBLE",
    pricePerNight: 180,
    capacity: 3,
    status: "AVAILABLE",
    description: "An elegant double room featuring rich fabrics and city views.",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    features: ["Queen Bed", "City View", "Mini Bar", "Air Conditioning"],
  },
  {
    id: "room-303",
    number: "303",
    name: "Vine Suite",
    type: "SUITE",
    pricePerNight: 260,
    capacity: 4,
    status: "AVAILABLE",
    description: "A luxurious suite with a lounge area, premium décor, and sunset terrace access.",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    features: ["Living Room", "Terrace", "Bathtub", "Complimentary Breakfast"],
  },
  {
    id: "room-404",
    number: "404",
    name: "Imperial VIP",
    type: "VIP",
    pricePerNight: 420,
    capacity: 4,
    status: "OCCUPIED",
    description: "Our signature VIP room with a private spa-style bathroom and exceptional dining amenities.",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    features: ["Jacuzzi", "Private Lounge", "Butler Service", "Champagne Setup"],
  },
];

export const menuSeed = [
  {
    id: "menu-breakfast-1",
    name: "Full Ethiopian Breakfast",
    category: "BREAKFAST",
    description: "Traditional injera, egg, coffee, and fresh fruit platter.",
    price: 25,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "menu-breakfast-2",
    name: "Wheat Pancakes",
    category: "BREAKFAST",
    description: "Served with honey, berry compote, and whipped cream.",
    price: 18,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "menu-traditional-1",
    name: "Doro Wat",
    category: "TRADITIONAL_DISHES",
    description: "Stewed chicken in berbere sauce with injera.",
    price: 32,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "menu-traditional-2",
    name: "Kitfo Deluxe",
    category: "TRADITIONAL_DISHES",
    description: "Ethiopian minced steak served with kochkocha butter and injera.",
    price: 36,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "menu-fastfood-1",
    name: "Grilled Chicken Burger",
    category: "FAST_FOOD",
    description: "Chargrilled chicken burger with signature house sauce.",
    price: 26,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "menu-drink-1",
    name: "House Wine Selection",
    category: "DRINKS",
    description: "Elegant glass pours from our curated regional cellar.",
    price: 16,
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
  },
];

export const amenityHighlights = [
  "Wine cellar dining",
  "24/7 concierge",
  "Spa and wellness",
  "Airport transfers",
  "Infinity rooftop bar",
  "Private event hosting",
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
];
