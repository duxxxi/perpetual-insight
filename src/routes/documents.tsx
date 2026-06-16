import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, FileSignature, FileSpreadsheet, FileImage, Search, Sparkles, Download, Share2, Folder, Star } from "lucide-react";
import { PageShell } from "@/components/app-shell";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Perpetuity" },
      { name: "description", content: "Every contract, BL, and brief — searchable and summarized." },
      { property: "og:title", content: "Documents — Perpetuity" },
      { property: "og:description", content: "Every contract, BL, and brief — searchable and summarized." },
    ],
  }),
  component: DocumentsPage,
});

type Doc = {
  id: string;
  name: string;
  kind: "Contract" | "Invoice" | "BL" | "Spreadsheet" | "Brief" | "Image";
  size: string;
  updated: string;
  owner: string;
  starred?: boolean;
};

const docs: Doc[] = [
  { id: "1", name: "EuroMach · Q3 Softwood Frame Agreement v3.pdf", kind: "Contract", size: "318 KB", updated: "Today · 13:42", owner: "You", starred: true },
  { id: "2", name: "Volkov · BL-2024-0612 · Klaipeda discharge.pdf", kind: "BL", size: "1.1 MB", updated: "Today · 09:08", owner: "Andrei V." },
  { id: "3", name: "Treasury · USDC rail test summary.md", kind: "Brief", size: "12 KB", updated: "Today · 10:24", owner: "Perpetuity" },
  { id: "4", name: "Invoice · INV-2026-0418 · Maderas del Norte.pdf", kind: "Invoice", size: "92 KB", updated: "Yesterday", owner: "You" },
  { id: "5", name: "Margins · H1 2026 · scenarios.xlsx", kind: "Spreadsheet", size: "204 KB", updated: "Mon", owner: "Perpetuity" },
  { id: "6", name: "Marriott Yerevan · reservation hold.pdf", kind: "Contract", size: "44 KB", updated: "Mon", owner: "Perpetuity" },
  { id: "7", name: "Klaipeda terminal · drone survey.jpg", kind: "Image", size: "4.8 MB", updated: "Last week", owner: "Inga P." },
];

const iconFor = {
  Contract: FileSignature,
  Invoice: FileText,
  BL: FileText,
  Spreadsheet: FileSpreadsheet,
  Brief: FileText,
  Image: FileImage,
} as const;

const kindTone = {
  Contract: "bg-violet-500/10 text-violet-700 ring-violet-500/15 dark:text-violet-300",
  Invoice: "bg-amber-500/10 text-amber-700 ring-amber-500/15 dark:text-amber-300",
  BL: "bg-sky-500/10 text-sky-700 ring-sky-500/15 dark:text-sky-300",
  Spreadsheet: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/15 dark:text-emerald-300",
  Brief: "bg-foreground/10 text-foreground/80 ring-foreground/10",
  Image: "bg-rose-500/10 text-rose-700 ring-rose-500/15 dark:text-rose-300",
} as const;

function DocumentsPage() {
  const [selectedId, setSelectedId] = useState(docs[0].id);
  const selected = docs.find((d) => d.id === selectedId)!;
  const SelectedIcon = iconFor[selected.kind];

  return (
    <PageShell
      active="documents"
      eyebrow={`${docs.length} documents · 3 added today`}
      title="organized, summarized, searchable"
      accentWord="Documents"
      rightSlot={
        <div className="flex items-center gap-2">
          <button className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium">
            <Folder className="size-3.5" strokeWidth={1.75} /> New folder
          </button>
          <button className="glass-panel-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium">
            Upload
          </button>
        </div>
      }
    >
      {/* Search */}
      <div className="mb-4 glass-panel flex items-center gap-2 rounded-full px-4 py-2.5">
        <Search className="size-4 text-foreground/40" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Search across every contract, BL, and brief…"
          className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
        />
        <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/35">Semantic · powered by Perpetuity</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* List */}
        <section className="lg:col-span-7">
          <div className="glass-panel-strong overflow-hidden rounded-3xl">
            <div className="grid grid-cols-[1fr_90px_120px_40px] gap-3 border-b border-foreground/5 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
              <div>Name</div>
              <div>Size</div>
              <div>Updated</div>
              <div />
            </div>
            <ul className="divide-y divide-foreground/5">
              {docs.map((d) => {
                const Icon = iconFor[d.kind];
                return (
                  <li key={d.id}>
                    <button
                      onClick={() => setSelectedId(d.id)}
                      className={`grid w-full grid-cols-[1fr_90px_120px_40px] items-center gap-3 px-5 py-3 text-left transition-colors ${
                        selectedId === d.id ? "bg-foreground/[0.05]" : "hover:bg-foreground/[0.025]"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ${kindTone[d.kind]}`}>
                          <Icon className="size-4" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[13px] text-foreground/90">{d.name}</p>
                          <p className="text-[11px] text-foreground/50">{d.kind} · {d.owner}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-foreground/55">{d.size}</span>
                      <span className="font-mono text-[11px] text-foreground/55">{d.updated}</span>
                      <span className="flex justify-end">
                        {d.starred && <Star className="size-3.5 fill-accent text-accent" strokeWidth={1.5} />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Preview */}
        <section className="lg:col-span-5">
          <div className="glass-panel-strong rounded-3xl">
            <div className="border-b border-foreground/5 px-5 py-5">
              <div className="flex items-start gap-3">
                <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ${kindTone[selected.kind]}`}>
                  <SelectedIcon className="size-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/45">{selected.kind}</p>
                  <h2 className="mt-0.5 font-serif text-[17px] italic leading-snug tracking-tight">{selected.name}</h2>
                  <p className="mt-1 text-[11px] text-foreground/55">
                    {selected.size} · updated {selected.updated} · {selected.owner}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background">
                  Open
                </button>
                <button className="glass-panel inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium">
                  <Download className="size-3" /> Download
                </button>
                <button className="glass-panel inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium">
                  <Share2 className="size-3" /> Share
                </button>
              </div>
            </div>

            {/* AI summary */}
            <div className="relative px-5 py-5">
              <div className="ai-iridescent absolute inset-x-5 top-5 h-px opacity-60" aria-hidden />
              <div className="flex items-start gap-3 pt-3">
                <div className="ai-iridescent flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/5">
                  <Sparkles className="size-3.5 text-foreground/80" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
                    Perpetuity summary
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/85">
                    Frame agreement covers 120t softwood across Q3 at CIF Yerevan with a 6.5% volume rebate above 80t. Payment 30/60 net, INCO 2020. Three clauses changed from v2: liquidated damages, force majeure, and the FX-revision trigger now at ±4.5%.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[12px] text-foreground/70">
                    <li>· Counterparty: EuroMach a.s. (Bratislava)</li>
                    <li>· Term: 1 Jul – 30 Sep 2026</li>
                    <li>· Linked thread: Marta Kováčová · today 13:18</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
