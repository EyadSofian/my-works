import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project default easing (expo-out) — matches the motion language in tokens.
gsap.defaults({ ease: 'power3.out' });
export const EASE_EXPO = 'expo.out';

export { gsap, ScrollTrigger };
