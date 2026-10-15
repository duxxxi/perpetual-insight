import { useEffect, useRef, useState } from "react";
import { Check, Images, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import streetVideo from "@/assets/about-272512.mp4.asset.json";
import cityVideo from "@/assets/about-city.mp4.asset.json";
import streetPoster from "@/assets/about-272512-poster.jpg.asset.json";
import cityPoster from "@/assets/about-city-poster.jpg.asset.json";
import streetWebm from "@/assets/about-272512.webm.asset.json";
import cityWebm from "@/assets/about-city.webm.asset.json";

const videoOptions = {
  street: { url: streetVideo.url, webm: streetWebm.url, poster: streetPoster.url },
  skyline: { url: cityVideo.url, webm: cityWebm.url, poster: cityPoster.url },
};

export const backgroundOptions = videoOptions;
type BackgroundVersion = keyof typeof backgroundOptions;
export type BackgroundSelection = BackgroundVersion;
const versions = ["street", "skyline"] as const;
const labels = { street: "City avenue · Video", skyline: "Sunset skyline · Video" };

function getVideo(version: BackgroundVersion) {
  return videoOptions[version];
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
  return <video key={version} ref={ref} poster={video.poster} loop muted playsInline preload="metadata" aria-hidden className={`${className} about-business-video`}><source src={video.webm} type="video/webm" /><source src={video.url} type="video/mp4" /></video>;
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
      <section>
        <div className="grid grid-cols-2 gap-3">
        {versions.map(version => <div key={version} className="min-w-0">
          <p className="mb-2 text-[11px] text-muted-foreground">{labels[version]}</p>
          <div className="relative"><img src={getVideo(version).poster} alt={`${labels[version]} background`} loading="lazy" width={1536} height={1024} className="aspect-[7/4] w-full rounded-lg object-cover" /><Play aria-hidden className="absolute bottom-2 right-2 size-6 rounded-full bg-card p-1 text-foreground" /></div>
          <Button variant={selection === version ? "secondary" : "outline"} size="sm" aria-pressed={selection === version} onClick={() => onChange(version)} className="mt-2 w-full text-[11px]" aria-label={`Use ${version} background`}>
            {selection === version && <Check className="size-3" />}{selection === version ? "Selected" : "Use"}
          </Button>
        </div>)}
        </div>
      </section>
      <div className="flex justify-end"><Button size="sm" onClick={() => setOpen(false)}>Done</Button></div>
    </DialogContent>
  </Dialog>;
}
