import { useEffect, useRef } from "react";
import streetVideo from "@/assets/about-272512.mp4.asset.json";
import streetPoster from "@/assets/about-272512-poster.jpg.asset.json";
import streetWebm from "@/assets/about-272512.webm.asset.json";

export function AboutBackgroundMedia() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (!motion.matches && !document.hidden) void element.play().catch(() => {});
      else element.pause();
    };
    update();
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <video ref={ref} poster={streetPoster.url} loop muted playsInline preload="metadata" aria-hidden className="about-business-image about-business-video"><source src={streetWebm.url} type="video/webm" /><source src={streetVideo.url} type="video/mp4" /></video>;
}
