import { useEffect, useRef } from "react";

/** A non-interactive highlight; never substitutes for the system pointer. */
export function AboutCursorGlow({ enabled }: { enabled: boolean }) {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const glow = glowRef.current;
    const surface = glow?.parentElement;
    if (!glow || !surface || !enabled) return;
    const preference = window.matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const hide = () => { glow.dataset.visible = "false"; };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType === "touch") { hide(); return; }
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        glow.dataset.visible = "true";
      });
    };
    surface.addEventListener("pointermove", move);
    surface.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", hide);
    preference.addEventListener("change", hide);
    return () => {
      window.cancelAnimationFrame(frame);
      hide();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", hide);
      preference.removeEventListener("change", hide);
    };
  }, [enabled]);
  return <div ref={glowRef} className="about-cursor-glow" aria-hidden="true" data-visible="false" />;
}