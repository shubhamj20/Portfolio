export type Tool = {
  id: string;
  name: string;
  icon: string; // lucide-react icon fallback name
};

export const tools: Tool[] = [
  { id: "premiere", name: "Adobe Premiere Pro", icon: "Film" },
  { id: "aftereffects", name: "Adobe After Effects", icon: "Sparkles" },
  { id: "resolve", name: "DaVinci Resolve", icon: "SlidersHorizontal" },
  { id: "photoshop", name: "Adobe Photoshop", icon: "Image" },
  { id: "lightroom", name: "Adobe Lightroom", icon: "Aperture" },
  { id: "capcut", name: "CapCut", icon: "Scissors" },
];

export type WhyPoint = {
  id: string;
  title: string;
  description: string;
};

export const whyWorkWithMe: WhyPoint[] = [
  {
    id: "storytelling",
    title: "Cinematic Storytelling",
    description: "Every edit has a purpose.",
  },
  {
    id: "social-first",
    title: "Social-First Editing",
    description: "Designed for modern platforms.",
  },
  {
    id: "color-focused",
    title: "Color-Focused",
    description: "Strong understanding of cinematic color.",
  },
  {
    id: "detail",
    title: "Attention to Detail",
    description: "Pacing, sound, transitions and visual consistency.",
  },
  {
    id: "communication",
    title: "Reliable Communication",
    description: "Clear project communication and revisions.",
  },
];

export type ClientType = {
  id: string;
  title: string;
  description: string;
  cta: string;
};

export const clientTypes: ClientType[] = [
  {
    id: "travel-creators",
    title: "Travel Creators",
    description: "Turn your travel footage into reels people want to watch.",
    cta: "Let's Talk",
  },
  {
    id: "brands",
    title: "Brands",
    description: "Create cinematic social content that tells your brand story.",
    cta: "Let's Talk",
  },
  {
    id: "hotels-resorts",
    title: "Hotels & Resorts",
    description: "Showcase destinations, properties and experiences.",
    cta: "Let's Talk",
  },
  {
    id: "agencies",
    title: "Social Media Agencies",
    description: "Professional editing support for your clients and campaigns.",
    cta: "Let's Talk",
  },
];

export type ProcessStep = {
  step: string;
  title: string;
};

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Send Footage" },
  { step: "02", title: "Discuss The Vision" },
  { step: "03", title: "Edit & Color" },
  { step: "04", title: "Review" },
  { step: "05", title: "Final Delivery" },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Client testimonial will appear here.",
    name: "Client Name",
    role: "Role / Company",
    placeholder: true,
  },
  {
    id: "t2",
    quote: "Client testimonial will appear here.",
    name: "Client Name",
    role: "Role / Company",
    placeholder: true,
  },
  {
    id: "t3",
    quote: "Client testimonial will appear here.",
    name: "Client Name",
    role: "Role / Company",
    placeholder: true,
  },
];
