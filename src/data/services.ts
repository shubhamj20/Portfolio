export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
};

export const services: Service[] = [
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Cinematic cuts, pacing, transitions and storytelling.",
    icon: "Clapperboard",
  },
  {
    id: "color-grading",
    title: "Color Grading",
    description: "Transforming raw footage into cinematic visual moods.",
    icon: "Palette",
  },
  {
    id: "sound-design",
    title: "Sound Design",
    description:
      "Music, ambience and sound effects that make every frame feel alive.",
    icon: "AudioWaveform",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    description: "Clean titles, maps, animations and visual effects.",
    icon: "Sparkles",
  },
  {
    id: "social-media-editing",
    title: "Social Media Editing",
    description:
      "Engaging short-form content designed for Instagram, YouTube Shorts and modern social platforms.",
    icon: "Smartphone",
  },
];
