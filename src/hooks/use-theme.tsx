import { useEffect, useState, useCallback } from "react";

type Mode = "light" | "dark" | "auto";

const STORAGE_KEY = "perpetuity-theme";

function isEveningNow() {
  const h = new Date().getHours();
  return h >= 19 || h < 7;
}

function resolve(mode: Mode): "light" | "dark" {
  if (mode === "auto") return isEveningNow() ? "dark" : "light";
  return mode;
}

function apply(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [mode, setMode] = useState<Mode>("auto");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  // Initial load
  useEffect(() => {
    const saved = (typeof localStorage !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as Mode | null)
      : null) || "auto";
    setMode(saved);
    const r = resolve(saved);
    setResolved(r);
    apply(r);
  }, []);

  // Re-evaluate every minute when in auto mode
  useEffect(() => {
    if (mode !== "auto") return;
    const id = setInterval(() => {
      const r = resolve("auto");
      setResolved((prev) => {
        if (prev !== r) apply(r);
        return r;
      });
    }, 60_000);
    return () => clearInterval(id);
  }, [mode]);

  const setTheme = useCallback((next: Mode) => {
    setMode(next);
    if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, next);
    const r = resolve(next);
    setResolved(r);
    apply(r);
  }, []);

  const toggle = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  return { mode, resolved, setTheme, toggle };
}
