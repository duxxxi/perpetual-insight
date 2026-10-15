import { useEffect, useRef, useState } from "react";
import { Check, Images, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import originalDay from "@/assets/about-original-day.png.asset.json";
import originalNight from "@/assets/about-original-night.png.asset.json";
import currentDay from "@/assets/about-business-skyline-trial.png.asset.json";
import currentNight from "@/assets/about-business-night-refined.png.asset.json";
import cityDay from "@/assets/about-city-lights-day.jpg.asset.json";
import cityNight from "@/assets/about-city-lights-night.jpg.asset.json";
import alternativeDay from "@/assets/about-alternative-day.jpg";
import alternativeNight from "@/assets/about-alternative-night.jpg";
import parkVideo from "@/assets/about-central_park.mp4.asset.json";
import streetVideo from "@/assets/about-272512.mp4.asset.json";
import cityVideo from "@/assets/about-city.mp4.asset.json";
import parkPoster from "@/assets/about-central_park-poster.jpg.asset.json";
import streetPoster from "@/assets/about-272512-poster.jpg.asset.json";
import cityPoster from "@/assets/about-city-poster.jpg.asset.json";

const videoOptions = {
  park: { url: parkVideo.url, poster: parkPoster.url },
  street: { url: streetVideo.url, poster: streetPoster.url },
  skyline: { url: cityVideo.url, poster: cityPoster.url },
};

export const backgroundOptions = {
  day: { original: originalDay.url, current: currentDay.url, city: cityDay.url, alternative: alternativeDay, park: parkPoster.url, street: streetPoster.url, skyline: cityPoster.url },
  night: { original: originalNight.url, current: currentNight.url, city: cityNight.url, alternative: alternativeNight, park: parkPoster.url, street: streetPoster.url, skyline: cityPoster.url },
};
type BackgroundVersion = keyof typeof backgroundOptions.day;
export type BackgroundSelection = { day: BackgroundVersion; night: BackgroundVersion };
const versions = ["original", "current", "city", "alternative", "park", "street", "skyline"] as const;
const labels = { original: "Original painting", current: "Current painting", city: "City lights", alternative: "New painting", park: "Central Park · Video", street: "City avenue · Video", skyline: "Sunset skyline · Video" };

function getVideo(version: BackgroundVersion) {
  return version === "park" || version === "street" || version === "skyline" ? videoOptions[version] : undefined;
}

export function AboutBackgroundMedia({ version, period, active }: { version: BackgroundVersion; period: "day" | "night"; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const video = getVideo(version);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (active && !motion.matches && !document.hidden) void element.play().catch(() => {});
      else element.pause();
    };
    update();
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, [active, version]);
  const className = `about-business-image about-business-${period}`;
  return video
    ? <video key={version} ref={ref} src={video.url} poster={video.poster} loop muted playsInline preload="metadata" aria-hidden className={`${className} about-business-video`} />
    : <img src={backgroundOptions[period][version]} alt="" width={1536} height={768} className={className} />;
}

export function AboutBackgroundComparison({ selection, onChange }: {
  selection: BackgroundSelection;
  onChange: (selection: BackgroundSelection) => void;
}) {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button variant="outline" size="sm" aria-label="Compare backgrounds" title="Compare backgrounds" className="h-8 rounded-full bg-card px-3 text-[11px]"><Images className="size-3.5" /><span className="hidden sm:inline">Compare backgrounds</span></Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-24px)] max-w-4xl overflow-y-auto rounded-lg p-4 sm:p-6" aria-describedby={undefined}>
      <DialogTitle className="text-base">Background comparison</DialogTitle>
      {(["day", "night"] as const).map(period => <section key={period}>
        <h3 className="mb-3 text-sm font-medium capitalize">{period}</h3>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {versions.map(version => <div key={`${period}-${version}`} className="min-w-0">
          <p className="mb-2 text-[11px] text-muted-foreground">{labels[version]}</p>
          <div className="relative"><img src={backgroundOptions[period][version]} alt={`${labels[version]} ${period} background`} loading="lazy" width={1536} height={1024} className="aspect-[7/4] w-full rounded-lg object-cover" />{getVideo(version) && <Play aria-hidden className="absolute bottom-2 right-2 size-6 rounded-full bg-card p-1 text-foreground" />}</div>
          <Button variant={selection[period] === version ? "secondary" : "outline"} size="sm" aria-pressed={selection[period] === version} onClick={() => onChange({ ...selection, [period]: version })} className="mt-2 w-full text-[11px]" aria-label={`Use ${version} ${period} background`}>
            {selection[period] === version && <Check className="size-3" />}{selection[period] === version ? "Selected" : `Use ${period}`}
          </Button>
        </div>)}
        </div>
      </section>)}
      <div className="flex justify-end"><Button size="sm" onClick={() => setOpen(false)}>Done</Button></div>
    </DialogContent>
  </Dialog>;
}