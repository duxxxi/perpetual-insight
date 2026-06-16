import { Sun, Moon, CircleDot } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/**
 * Apple-style segmented pill: Light · Auto · Dark.
 * Supports horizontal (default) and vertical orientation for sidebar use.
 */
export function ThemeToggle({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const { mode, setTheme } = useTheme();

  const options = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "auto" as const, icon: CircleDot, label: "Auto" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "glass-panel inline-flex items-center gap-0.5 p-0.5",
        orientation === "vertical" ? "flex-col rounded-full" : "rounded-full",
        className,
      )}
    >
      {options.map((o) => {
        const active = mode === o.value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={active}
            title={o.label}
            onClick={() => setTheme(o.value)}
            className={cn(
              "relative flex size-7 items-center justify-center rounded-full transition-all",
              active
                ? "bg-foreground text-background shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)]"
                : "text-foreground/45 hover:text-foreground/80",
            )}
          >
            <o.icon className="size-[13px]" strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
