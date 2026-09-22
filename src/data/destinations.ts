// ============================================================
// DESTINATION DATA
// Coordinates are real [longitude, latitude] pairs (Mapbox
// convention) so pins sit at geographically accurate locations
// on the live map.
// ============================================================

export type Destination = {
  id: string;
  name: string;
  region: string;
  position: [number, number]; // [lng, lat]
  color: string;
  thumbnail: string;
  description: string;
  techniques: string[];
  order: number;
};

export const destinations: Destination[] = [
  {
    id: "kashmir",
    name: "Kashmir",
    region: "North India",
    position: [74.7973, 34.0837], // Srinagar
    color: "#7ab8d4",
    thumbnail: "/images/destinations/kashmir.jpeg",
    description:
      "Snow-capped peaks, shikara-dotted lakes and breathtaking valley light.",
    techniques: ["Video Editing", "Color Grading", "Sound Design"],
    order: 1,
  },
  {
    id: "jodhpur",
    name: "Jodhpur",
    region: "Rajasthan",
    position: [73.0243, 26.2389],
    color: "#4f82c9",
    thumbnail: "/images/destinations/jodhpur.jpg",
    description:
      "The Blue City — vibrant indigo walls, golden forts and desert light.",
    techniques: ["Video Editing", "Color Grading", "Storytelling"],
    order: 2,
  },
  {
    id: "tungnath",
    name: "Tungnath",
    region: "Uttarakhand",
    position: [79.2174, 30.4868], // Tungnath temple
    color: "#8ab87a",
    thumbnail: "/images/destinations/tungnath.jpg",
    description:
      "World's highest Shiva temple — alpine meadows above the clouds.",
    techniques: ["Video Editing", "Color Grading", "Sound Design"],
    order: 3,
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    region: "Himachal Pradesh",
    position: [78.0321, 32.2432], // Kaza, Spiti
    color: "#b89e6a",
    thumbnail: "/images/destinations/spiti.jpeg",
    description:
      "A cold desert mountain valley — stark, raw and hauntingly beautiful.",
    techniques: ["Video Editing", "Color Grading", "Sound Design"],
    order: 4,
  },
];

// Journey order for the animated flight path (follows real geography)
export const journeyRoute = [
  "kashmir",
  "spiti",
  "tungnath",
  "jodhpur",
];

export const delhiPosition: [number, number] = [77.209, 28.6139];

// Center of India, used for the map's initial view.
export const INDIA_CENTER: [number, number] = [79.5, 22.5];

