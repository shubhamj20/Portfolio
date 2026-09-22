// ============================================================
// REEL DATA — Personal travel projects
// Real videos from Shubham's travel shoots.
// ============================================================

export type Reel = {
  id: string;
  destination: string;
  title: string;
  projectType: string;
  thumbnail: string;
  videoUrl: string;
  techniques: string[];
};

export const reels: Reel[] = [
  {
    id: "reel-kashmir-1",
    destination: "Kashmir",
    title: "Vale of Kashmir",
    projectType: "Travel Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/kashmir-reel.mp4",
    techniques: ["Video Editing", "Color Grading", "Sound Design"],
  },
  {
    id: "reel-kashmir-2",
    destination: "Kashmir",
    title: "Kashmir Untamed",
    projectType: "Travel Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/kashmir-reel-2.mp4",
    techniques: ["Video Editing", "Color Grading", "Storytelling"],
  },
  {
    id: "reel-kashmir-4",
    destination: "Kashmir",
    title: "Kashmir — Golden Hour",
    projectType: "Travel Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/kashmir-reel-4.mp4",
    techniques: ["Color Grading", "Sound Design"],
  },
  {
    id: "reel-jodhpur",
    destination: "Jodhpur",
    title: "Blue City Chronicles",
    projectType: "Travel Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/jodhpur-reel.mp4",
    techniques: ["Video Editing", "Color Grading", "Storytelling"],
  },
  {
    id: "reel-tungnath",
    destination: "Tungnath",
    title: "Tungnath — Above the Clouds",
    projectType: "Travel Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/tungnath-reel.mp4",
    techniques: ["Video Editing", "Color Grading", "Sound Design"],
  },
  {
    id: "reel-cinematic",
    destination: "India",
    title: "Cinematic India",
    projectType: "Cinematic Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/cinematic-reel.mp4",
    techniques: ["Cinematic Editing", "Color Grading", "Motion Graphics"],
  },
  {
    id: "reel-0423",
    destination: "India",
    title: "Travel Diary",
    projectType: "Travel Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/cinematic-0423.mp4",
    techniques: ["Video Editing", "Social Media Editing", "Color Grading"],
  },
  {
    id: "reel-spiti",
    destination: "Spiti Valley",
    title: "Spiti — Land of the Lamas",
    projectType: "Travel Reel · Personal Project",
    thumbnail: "",
    videoUrl: "/videos/spiti-reel.mp4",
    techniques: ["Video Editing", "Color Grading", "Sound Design"],
  },
];
