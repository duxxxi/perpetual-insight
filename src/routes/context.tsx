import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Brain, ChevronRight, CornerUpLeft, FileText, Link2, BookOpen, Clock, ImagePlus } from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { AskCard } from "@/components/perpetuity-asks";
import { ContextChat } from "@/components/context-chat";
import { useContextAsks } from "@/lib/context-store";
import { backlinks, parseInline, wikiById, wikiPages, type WikiBlock } from "@/lib/wiki";

export const Route = createFileRoute("/context")({
  head: () => ({
    meta: [
      { title: "Context — What Perpetuity Knows About Your Business" },
      {
        name: "description",
        content:
          "A living memory of your business: markets, products, commercial terms, operating patterns and the open questions Perpetuity needs answered.",
      },
      { property: "og:title", content: "Context — What Perpetuity Knows" },
      {
        property: "og:description",
        content: "Company facts, markets, terms and open questions that shape every Perpetuity action.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContextPage,
});

function ContextPage() {
  const [pageId, setPageId] = useState("overview");
  const page = wikiById(pageId) ?? wikiPages[0];
  const asks = useContextAsks();
  const open = asks.filter((a) => !a.answer);
  const links = backlinks(page.id);

  const tree = wikiPages.filter((p) => !p.parent);

  return (
    <PageShell
      active="context"
      eyebrow="Memory · shared by every agent"
      title=""
      accentWord="Context"
      rightSlot={
        <div className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1.5">
          <Brain className="size-3.5 text-accent" />
          <span className="font-mono text-[11px] font-semibold tabular-nums">78%</span>
          <span className="text-[11px] text-foreground/55">context coverage</span>
        </div>
      }
    >
      <div className="glass-panel overflow-hidden rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)]">
          {/* Wiki rail */}
          <nav className="border-b border-foreground/[0.07] p-2.5 lg:border-b-0 lg:border-r">
            <p className="px-2 pb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/35">
              Knowledge base
            </p>
            {tree.map((root) => (
              <div key={root.id}>
                <RailItem
                  page={root}
                  icon={<BookOpen className="size-3.5" />}
                  active={page.id === root.id}
                  onClick={() => setPageId(root.id)}
                />
                <div className="ml-2 border-l border-foreground/[0.07] pl-1.5">
                  {wikiPages
                    .filter((p) => p.parent === root.id)
                    .map((child) => (
                      <RailItem
                        key={child.id}
                        page={child}
                        icon={<FileText className="size-3.5" />}
                        active={page.id === child.id}
                        badge={child.id === "asks" && open.length > 0 ? open.length : undefined}
                        onClick={() => setPageId(child.id)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Article */}
          <article className="min-w-0 px-5 py-5 lg:px-8 lg:py-7">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] text-foreground/35">
              <span>Context</span>
              {page.parent ? (
                <>
                  <ChevronRight className="size-3" />
                  <button className="hover:text-foreground/70" onClick={() => setPageId(page.parent!)}>
                    {wikiById(page.parent)?.title}
                  </button>
                </>
              ) : null}
              <ChevronRight className="size-3" />
              <span className="text-foreground/60">{page.title}</span>
            </div>

            <h2 className="font-sans text-[24px] font-semibold tracking-[-0.025em] text-silver-metallic">
              {page.title}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-foreground/35">
              <Clock className="size-3" /> Last edited {page.edited}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/55">{page.summary}</p>
            <div className="my-5 h-px bg-foreground/[0.08]" />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_240px]">
              <div className="min-w-0 space-y-4">
                {page.blocks.map((b, i) => (
                  <Block key={i} block={b} onNavigate={setPageId} />
                ))}

                {page.id === "asks" ? (
                  <div className="space-y-2 pt-1">
                    {asks.length === 0 ? (
                      <p className="rounded-xl px-4 py-6 text-center text-sm text-foreground/45 ring-1 ring-foreground/[0.07]">
                        Nothing open. Perpetuity has what it needs for now.
                      </p>
                    ) : (
                      asks.map((a) => <AskCard key={a.id} ask={a} />)
                    )}
                  </div>
                ) : null}

                {/* Wiki footers */}
                {links.length > 0 ? (
                  <FooterList
                    icon={<CornerUpLeft className="size-3.5" />}
                    title="What links here"
                    items={links.map((p) => ({ id: p.id, title: p.title, hint: p.parent ? "Context" : "Hub" }))}
                    onNavigate={setPageId}
                  />
                ) : null}
                {page.related?.length ? (
                  <FooterList
                    icon={<Link2 className="size-3.5" />}
                    title="Related pages"
                    items={page.related
                      .map((id) => wikiById(id))
                      .filter(Boolean)
                      .map((p) => ({ id: p!.id, title: p!.title, hint: p!.summary.split(" ").slice(0, 5).join(" ") }))}
                    onNavigate={setPageId}
                  />
                ) : null}
              </div>

              {/* Infobox */}
              {page.infobox ? (
                <aside className="xl:pt-1">
                  <div className="rounded-xl ring-1 ring-foreground/[0.09]">
                    <p className="px-3 py-2.5 text-center text-[12px] font-semibold tracking-[-0.01em]">
                      {page.infobox.title}
                    </p>
                    <PhotoSlot key={page.id} />
                    {page.infobox.rows.map((r) => (
                      <div
                        key={r.label}
                        data-pill
                        className="grid cursor-default grid-cols-[84px_minmax(0,1fr)] gap-2 border-t border-foreground/[0.07] px-3 py-2 transition-colors hover:bg-foreground/[0.03]"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/40">
                          {r.label}
                        </span>
                        <span className="text-[11px] leading-snug text-foreground/75">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </aside>
              ) : null}
            </div>

            <ContextChat pageTitle={page.title} />
          </article>
        </div>
      </div>
    </PageShell>
  );
}

function RailItem({
  page,
  icon,
  active,
  badge,
  onClick,
}: {
  page: { id: string; title: string };
  icon: React.ReactNode;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] transition-colors ${
        active ? "bg-foreground/[0.06] font-semibold text-foreground" : "text-foreground/55 hover:bg-foreground/[0.03]"
      }`}
    >
      <span className="shrink-0 opacity-60">{icon}</span>
      <span className="truncate">{page.title}</span>
      {badge ? (
        <span className="ml-auto rounded-full bg-accent/15 px-1.5 text-[9px] font-semibold text-accent">{badge}</span>
      ) : null}
    </button>
  );
}

function Inline({ text, onNavigate }: { text: string; onNavigate: (id: string) => void }) {
  return (
    <>
      {parseInline(text).map((part, i) =>
        part.link ? (
          <button
            key={i}
            onClick={() => onNavigate(part.link!)}
            className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
          >
            {part.text}
          </button>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

function Block({ block, onNavigate }: { block: WikiBlock; onNavigate: (id: string) => void }) {
  if (block.kind === "h2")
    return (
      <h3 className="pt-2 text-[15px] font-semibold tracking-[-0.01em] text-foreground/90">{block.text}</h3>
    );
  if (block.kind === "p")
    return (
      <p className="text-[13.5px] leading-relaxed text-foreground/70">
        <Inline text={block.text} onNavigate={onNavigate} />
      </p>
    );
  if (block.kind === "ul")
    return (
      <ul className="space-y-1.5 pl-4">
        {block.items.map((it, i) => (
          <li key={i} className="list-disc text-[13.5px] leading-relaxed text-foreground/70 marker:text-foreground/25">
            <Inline text={it} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    );
  return (
    <div className="rounded-xl bg-foreground/[0.03] px-4 py-3 ring-1 ring-foreground/[0.06]">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{block.title}</p>
      <p className="text-[13px] leading-relaxed text-foreground/70">
        <Inline text={block.text} onNavigate={onNavigate} />
      </p>
    </div>
  );
}

function FooterList({
  icon,
  title,
  items,
  onNavigate,
}: {
  icon: React.ReactNode;
  title: string;
  items: { id: string; title: string; hint?: string }[];
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="pt-3">
      <div className="flex items-center gap-2 border-b border-foreground/[0.08] pb-1.5 text-foreground/60">
        {icon}
        <p className="text-[11px] font-semibold tracking-[-0.01em]">{title}</p>
      </div>
      <div className="pt-1.5">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onNavigate(it.id)}
            className="flex w-full items-baseline gap-2 rounded-lg px-1 py-1 text-left transition-colors hover:bg-foreground/[0.03]"
          >
            <span className="text-[12.5px] font-medium">{it.title}</span>
            {it.hint ? <span className="truncate text-[10.5px] text-foreground/35">{it.hint}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
