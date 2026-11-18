"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

interface MotionContextValue {
  prefersReducedMotion: boolean;
  isAmbientPaused: boolean;
  userEnabledMotion: boolean;
  toggleAmbientMotion: () => void;
}

const MotionContext = createContext<MotionContextValue>({
  prefersReducedMotion: false,
  isAmbientPaused: false,
  userEnabledMotion: false,
  toggleAmbientMotion: () => {},
});

export function useMotionPreferences() {
  return useContext(MotionContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isAmbientPaused, setIsAmbientPaused] = useState(false);
  const [userEnabledMotion, setUserEnabledMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsAmbientPaused(true);
        setUserEnabledMotion(false);
      }
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Keep native touch scrolling on narrow/coarse pointers; apply Lenis inertia on desktop.
    const isDesktopPointer = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    if (!isDesktopPointer) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  const toggleAmbientMotion = useCallback(() => {
    setIsAmbientPaused((prev) => {
      const nextPaused = !prev;
      setUserEnabledMotion(!nextPaused);
      return nextPaused;
    });
  }, []);

  const value = useMemo(
    () => ({
      prefersReducedMotion,
      isAmbientPaused,
      userEnabledMotion,
      toggleAmbientMotion,
    }),
    [prefersReducedMotion, isAmbientPaused, userEnabledMotion, toggleAmbientMotion]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
