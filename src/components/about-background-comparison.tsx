import { useState } from "react";
import { Check, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import originalDay from "@/assets/about-original-day.png.asset.json";
import originalNight from "@/assets/about-original-night.png.asset.json";
import currentDay from "@/assets/about-business-skyline-trial.png.asset.json";
import currentNight from "@/assets/about-business-night-refined.png.asset.json";

export const backgroundOptions = {
  day: { original: originalDay.url, current: currentDay.url },
  night: { original: originalNight.url, current: currentNight.url },
};
export type BackgroundSelection = { day: "original" | "current"; night: "original" | "current" };

export function AboutBackgroundComparison({ selection, onChange }: {
  selection: BackgroundSelection;
  onChange: (selection: BackgroundSelection) => void;
}) {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button variant="outline" size="sm" aria-label="Compare backgrounds" title="Compare backgrounds" className="h-8 rounded-full bg-card px-3 text-[11px]"><Images className="size-3.5" /><span className="hidden sm:inline">Compare backgrounds</span></Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-24px)] max-w-4xl overflow-y-auto rounded-lg p-4 sm:p-6" aria-describedby={undefined}>
      <DialogTitle className="text-base">Background comparison</DialogTitle>
      <div className="grid grid-cols-2 gap-3">
        <p className="text-xs font-medium">Original paintings</p><p className="text-xs font-medium">Current paintings</p>
        {(["day", "night"] as const).map(period => (["original", "current"] as const).map(version => <div key={`${period}-${version}`} className="min-w-0">
          <p className="mb-2 text-[11px] capitalize text-muted-foreground">{period}</p>
          <img src={backgroundOptions[period][version]} alt={`${version} ${period} Manhattan skyline`} className="aspect-[7/4] w-full rounded-lg object-cover" />
          <Button variant={selection[period] === version ? "secondary" : "outline"} size="sm" aria-pressed={selection[period] === version} onClick={() => onChange({ ...selection, [period]: version })} className="mt-2 w-full text-[11px]" aria-label={`Use ${version} ${period} background`}>
            {selection[period] === version && <Check className="size-3" />}{selection[period] === version ? "Selected" : `Use ${period}`}
          </Button>
        </div>))}
      </div>
      <div className="flex justify-end"><Button size="sm" onClick={() => setOpen(false)}>Done</Button></div>
    </DialogContent>
  </Dialog>;
}