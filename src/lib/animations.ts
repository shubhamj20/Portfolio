import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const easeCinematic = "power3.out";
export const easeSoft = "power2.inOut";

export { gsap, ScrollTrigger };
