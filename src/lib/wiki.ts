// Wiki-style knowledge base backing the Context page.
// Every page is a node in a small graph: prose blocks with inline links,
// an optional infobox, and computed backlinks.

export type WikiBlock =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "callout"; title: string; text: string };

export type WikiPage = {
  id: string;
  title: string;
  parent?: string;
  edited: string;
  summary: string;
  blocks: WikiBlock[];
  infobox?: { title: string; rows: { label: string; value: string }[] };
  related?: string[];
};

// Inline links are written as [[page-id|label]] inside text.
export const wikiPages: WikiPage[] = [
  {
    id: "overview",
    title: "Overview",
    edited: "Today, 08:12",
    summary: "What Perpetuity knows about the business — the hub of the context wiki.",
    infobox: {
      title: "Perpetuity",
      rows: [
        { label: "Business", value: "Timber, pulp & paper export brokerage" },
        { label: "Home base", value: "Skopje · desk in Bratislava" },
        { label: "Markets", value: "EU, CIS, SEA, LATAM" },
        { label: "Currency", value: "EUR primary, USD for LATAM" },
        { label: "Coverage", value: "78% context complete" },
      ],
    },
    blocks: [
      {
        kind: "callout",
        title: "Recent updates",
        text: "Aug 5 — Learned payment terms from [[commercial|commercial terms]] on the Hoffmann thread; inferred Turkey and Egypt as watch markets from reading history; 3 open questions remain in [[asks|Perpetuity asks]].",
      },
      { kind: "h2", text: "What this is" },
      {
        kind: "p",
        text: "This is the memory every agent reads before it acts. Outreach drafts, tender replies, quote screens and briefs are all written against the facts recorded here. When something is wrong on this page, the whole platform is wrong — correct it here rather than in the individual output.",
      },
      { kind: "h2", text: "How it is assembled" },
      {
        kind: "p",
        text: "Facts arrive three ways: you state them during onboarding, Perpetuity infers them from your [[operating|working patterns]] and documents, or it asks you directly in [[asks|Perpetuity asks]] when a pattern is ambiguous. Inferred facts carry their source so you can challenge them.",
      },
      { kind: "h2", text: "The shape of the business" },
      {
        kind: "p",
        text: "Perpetuity brokers softwood sawn timber, kraft pulp and containerboard out of Skopje into the EU, with opportunistic flow into CIS, Southeast Asia and Latin America. See [[products|products & certifications]] and [[markets|markets]] for the detail, and [[commercial|commercial terms]] for how deals are priced and paid.",
      },
    ],
    related: ["markets", "products", "commercial", "operating", "asks"],
  },
  {
    id: "markets",
    title: "Markets",
    parent: "overview",
    edited: "Today, 07:41",
    summary: "Where the business sells, where it is watching, and where it will not go.",
    infobox: {
      title: "Market posture",
      rows: [
        { label: "Core", value: "DE, PL, AT" },
        { label: "Opportunistic", value: "CIS, SEA, LATAM" },
        { label: "Watching", value: "Turkey, Egypt" },
        { label: "Excluded", value: "RU, BY" },
      ],
    },
    blocks: [
      { kind: "h2", text: "Active markets" },
      {
        kind: "p",
        text: "Germany, Poland and Austria carry the majority of volume and the deepest buyer relationships. Perpetuity treats these as default targets for outreach and reads their tender feeds daily under [[operating|routines]].",
      },
      { kind: "h2", text: "Watch list" },
      {
        kind: "p",
        text: "Turkey and Egypt appear in reading history far more than in closed business. Both are freight-sensitive, so Perpetuity only surfaces them when Brent and container rates move in your favour.",
      },
      { kind: "h2", text: "Constraints" },
      {
        kind: "ul",
        items: [
          "Russia and Belarus are excluded outright for compliance.",
          "Egypt is prepayment-only until a payment record exists.",
          "LATAM invoicing is USD — see [[commercial|commercial terms]].",
        ],
      },
    ],
    related: ["overview", "commercial", "asks"],
  },
  {
    id: "products",
    title: "Products & certifications",
    parent: "overview",
    edited: "Yesterday, 16:20",
    summary: "The SKUs Perpetuity can quote and the paperwork that backs them.",
    infobox: {
      title: "Catalogue",
      rows: [
        { label: "Core SKUs", value: "Softwood sawn, kraft pulp, containerboard" },
        { label: "Certifications", value: "FSC, REACH on file" },
        { label: "Capacity", value: "Unconfirmed — asked" },
      ],
    },
    blocks: [
      { kind: "h2", text: "What can be sold" },
      {
        kind: "p",
        text: "Softwood sawn timber is the anchor product; kraft pulp and containerboard trade opportunistically against pulp price moves. Perpetuity will not quote a product that does not appear here.",
      },
      { kind: "h2", text: "Compliance documents" },
      {
        kind: "p",
        text: "FSC chain-of-custody and a REACH file are on record and are attached automatically to EU tender replies. Anything missing is raised as an open question in [[asks|Perpetuity asks]] before a deadline, not after.",
      },
      { kind: "h2", text: "Open gap" },
      {
        kind: "p",
        text: "Monthly shippable capacity is still unknown, which caps how much volume Perpetuity will commit in outreach. Answer it in [[asks|Perpetuity asks]] to unlock volume language in drafts.",
      },
    ],
    related: ["overview", "markets", "asks"],
  },
  {
    id: "commercial",
    title: "Commercial terms",
    parent: "overview",
    edited: "Today, 07:58",
    summary: "Pricing, payment, Incoterms and who signs off.",
    infobox: {
      title: "Deal defaults",
      rows: [
        { label: "Currency", value: "EUR (USD for LATAM)" },
        { label: "Payment", value: "30% advance, balance on B/L copy" },
        { label: "Incoterms", value: "Unconfirmed — asked" },
        { label: "Margin floor", value: "Unconfirmed — asked" },
        { label: "Approver", value: "Unconfirmed — asked" },
      ],
    },
    blocks: [
      { kind: "h2", text: "Payment" },
      {
        kind: "p",
        text: "Standard structure is 30% advance with the balance released against a bill of lading copy. This was learned from your own outreach templates rather than stated, so it is worth confirming.",
      },
      { kind: "h2", text: "Pricing" },
      {
        kind: "p",
        text: "Quotes are built in EUR, with USD used for Latin American buyers. Perpetuity references Brent and pulp benchmarks when framing price movement, but never quotes below a margin floor — which it does not have yet.",
      },
      {
        kind: "callout",
        title: "Blocked without an answer",
        text: "Incoterms defaults, the margin floor and the €50k approver are all open in [[asks|Perpetuity asks]]. Until they are answered, Perpetuity drafts quotes but will not send them unattended.",
      },
    ],
    related: ["overview", "markets", "asks"],
  },
  {
    id: "operating",
    title: "Operating patterns",
    parent: "overview",
    edited: "Yesterday, 19:02",
    summary: "Working rhythm, tone of voice, and the routines that run without you.",
    infobox: {
      title: "How you work",
      rows: [
        { label: "Hours", value: "07:30 – 19:00 CET" },
        { label: "Focus", value: "EU-first mornings" },
        { label: "Tone", value: "Direct, short, no filler" },
        { label: "Routines", value: "3 enabled" },
      ],
    },
    blocks: [
      { kind: "h2", text: "Rhythm" },
      {
        kind: "p",
        text: "Mornings are EU-first: tenders, buyer replies, approvals. Perpetuity front-loads anything that needs a decision before 11:00 CET and holds low-signal items for the evening digest.",
      },
      { kind: "h2", text: "Voice" },
      {
        kind: "p",
        text: "Learned from your edits: short sentences, no hedging, no marketing language, and a concrete next step in the last line. Drafts that drift from this are rewritten before you see them.",
      },
      { kind: "h2", text: "Routines" },
      {
        kind: "ul",
        items: [
          "Daily EU tender sweep across DE, PL and AT.",
          "Compliance digest whenever an FSC or REACH document nears expiry.",
          "Buyer silence watch — flags a thread after 9 days of nothing.",
        ],
      },
    ],
    related: ["overview", "markets", "asks"],
  },
  {
    id: "asks",
    title: "Perpetuity asks",
    parent: "overview",
    edited: "Live",
    summary: "Open questions Perpetuity needs answered before it can act unattended.",
    blocks: [
      { kind: "h2", text: "Why this page exists" },
      {
        kind: "p",
        text: "When Perpetuity notices a pattern in your email, CRM or documents that it cannot resolve on its own, it asks. Each answer becomes a durable fact on [[overview|the overview]] and stops the question from returning.",
      },
    ],
    related: ["overview", "commercial", "products", "markets"],
  },
];

export const wikiById = (id: string) => wikiPages.find((p) => p.id === id);

const LINK = /\[\[([a-z-]+)\|([^\]]+)\]\]/g;

export function parseInline(text: string): { text: string; link?: string }[] {
  const out: { text: string; link?: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index! > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: m[2], link: m[1] });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

export function backlinks(id: string): WikiPage[] {
  return wikiPages.filter(
    (p) =>
      p.id !== id &&
      p.blocks.some((b) => {
        const t =
          b.kind === "ul" ? b.items.join(" ") : b.kind === "callout" ? b.text : (b as { text?: string }).text ?? "";
        return t.includes(`[[${id}|`);
      }),
  );
}
