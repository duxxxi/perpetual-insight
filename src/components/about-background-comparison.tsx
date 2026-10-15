import { useState } from "react";
import { Check, Images } from "lucide-react";
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

export const backgroundOptions = {
  day: { original: originalDay.url, current: currentDay.url, city: cityDay.url, alternative: alternativeDay },
  night: { original: originalNight.url, current: currentNight.url, city: cityNight.url, alternative: alternativeNight },
};
type BackgroundVersion = keyof typeof backgroundOptions.day;
export type BackgroundSelection = { day: BackgroundVersion; night: BackgroundVersion };
const versions = ["original", "current", "city", "alternative"] as const;
const labels = { original: "Original painting", current: "Current painting", city: "City lights", alternative: "New painting" };

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
          <img src={backgroundOptions[period][version]} alt={`${labels[version]} ${period} Manhattan skyline`} loading="lazy" width={1536} height={1024} className="aspect-[7/4] w-full rounded-lg object-cover" />
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