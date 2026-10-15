import { Radar, LineChart, ShieldCheck, Send } from "lucide-react";

export type CapTask = { label: string; state: "done" | "active" | "queued" };

export const agents = [
  {
    icon: Radar,
    name: "Opportunity Scout",
    line: "Scanning 34 EU procurement sources · 128 new today",
    metric: "2,847",
    unit: "tenders",
    state: "SCANNING",
  },
  {
    icon: LineChart,
    name: "Market Analyst",
    line: "Automotive demand rising in DE & CEE · high signal",
    metric: "35",
    unit: "markets",
    state: "ACTIVE",
  },
  {
    icon: ShieldCheck,
    name: "Compliance Watch",
    line: "New EU export regulation detected · 1 alert pending",
    metric: "17",
    unit: "updates",
    state: "1 ALERT",
  },
  {
    icon: Send,
    name: "Outreach Agent",
    line: "12 distributor drafts ready for your approval",
    metric: "284",
    unit: "drafted",
    state: "12 READY",
  },
];

export const stats = [
  { value: "2,847", label: "Tenders", delta: "+128" },
  { value: "1,126", label: "Matches", delta: "+73" },
  { value: "23", label: "Alerts", delta: "+5" },
  { value: "789", label: "Signals", delta: "+34" },
  { value: "12K+", label: "Contacts", delta: "+158" },
  { value: "40+", label: "Languages", delta: "100%" },
];

export const platform = [
  {
    title: "Connect your world",
    body: "Mail, CRM, drive, ERP and calendar are ingested once, then kept warm. Perpetuity reads everything so you never brief it twice.",
  },
  {
    title: "Agents that execute",
    body: "Scouting, analysis, compliance and outreach run continuously. Work arrives as tasks, drafts and briefs — never as another dashboard.",
  },
  {
    title: "Signal, not noise",
    body: "World markets, Polymarket odds, tenders and news are chewed down to the handful of moves that change your quarter.",
  },
];

export const editorial = [
  { value: "180+", label: "Countries monitored" },
  { value: "24/7", label: "Surveillance" },
  { value: "50K+", label: "Active tenders" },
  { value: "5", label: "AI agents" },
  { value: "40+", label: "Languages" },
  { value: "12K+", label: "Buyer contacts" },
  { value: "24/7", label: "Correspondence" },
];

export const trusted = [
  "Matador Group",
  "ROKOSAN",
  "Chemosvit Fibrochem",
  "GEVORKYAN",
  "ESSEL",
  "InoBat",
  "Fatra Napajedla",
  "Continental Matador",
  "Embraco Slovakia",
  "Kia Slovakia",
  "Whirlpool Slovakia",
  "Slovnaft",
  "U.S. Steel Košice",
  "ZKW Group",
  "Leoni Slovakia",
];

export const queries = [
  "Find industrial buyers for rubber components in Germany and Austria",
  "Scan EU tenders for aluminum sheet procurement in CEE",
  "Alert me if sanctions shifts affect my MENA supply chain",
];

export const steps = [
  {
    title: "Connect.",
    body: "Your inbox, contacts, CRM and calendar, in minutes. Perpetuity reads your world once and keeps it warm.",
  },
  {
    title: "Command.",
    body: "Agents surface the opportunity, draft the outreach, build the plan. Work arrives already half done.",
  },
  {
    title: "Execute.",
    body: "You approve in one click. Perpetuity does the rest, and never sleeps.",
  },
];

export const capabilities: { name: string; status: string; tone: string; tasks: CapTask[]; wide?: boolean }[] = [
  {
    name: "Opportunity Scout",
    status: "Live",
    tone: "text-emerald-500",
    tasks: [
      { label: "Scanned 2,847 EU tenders today", state: "done" },
      { label: "Ranked by relevance score", state: "done" },
      { label: "Scanning World Bank · 4,210 active", state: "active" },
      { label: "UN procurement queue loading", state: "queued" },
    ],
  },
  {
    name: "Market Analyst",
    status: "Live",
    tone: "text-emerald-500",
    tasks: [
      { label: "35 markets analysed today", state: "done" },
      { label: "Polymarket signals processed", state: "done" },
      { label: "Competitor price intelligence", state: "active" },
      { label: "LME metals feed active", state: "queued" },
    ],
  },
  {
    name: "Outreach Agent",
    status: "Live",
    tone: "text-emerald-500",
    tasks: [
      { label: "12 draft emails ready", state: "done" },
      { label: "Translated to German & Polish", state: "done" },
      { label: "Awaiting your approval", state: "active" },
      { label: "Follow-up schedule set", state: "queued" },
    ],
  },
  {
    name: "Compliance Watch",
    status: "Live · 1 alert",
    tone: "text-amber-500",
    tasks: [
      { label: "EU sanctions lists monitored", state: "done" },
      { label: "Export controls checked", state: "done" },
      { label: "New CBAM regulation detected", state: "active" },
      { label: "Customs rule updates pending", state: "queued" },
    ],
  },
  {
    name: "Organiser Agent",
    status: "Via Telegram",
    tone: "text-sky-500",
    wide: true,
    tasks: [
      { label: "Invoice #4821 filed and archived", state: "done" },
      { label: "156 documents organised this month", state: "done" },
      { label: "Sample room inventory updated from a photo", state: "done" },
      { label: "Customer correspondence logged", state: "done" },
      { label: "Customs documentation for DE shipment", state: "active" },
      { label: "Warehouse inventory sync pending", state: "queued" },
    ],
  },
];

export const intelPoints = [
  {
    title: "Find the opportunity.",
    body: "Markets, suppliers and customers watched around the clock. The deal you'd have missed, surfaced before it's gone.",
  },
  {
    title: "Do the work.",
    body: "Outreach drafted, deal plans built, meetings prepped — grounded in your real data, ready for approval.",
  },
  {
    title: "Guard the downside.",
    body: "Compliance shifts, margin risks and red flags caught early, so nothing slips through.",
  },
];

export const briefAlerts = [
  {
    time: "14:32",
    tone: "bg-rose-500/[0.07] ring-rose-400/15",
    label: "ECB Signal:",
    body: "Emergency rate indicators firing in Frankfurt. Bund yields +18bps. EUR/USD reaction in 30 min — affects export financing costs.",
  },
  {
    time: "13:15",
    tone: "bg-amber-500/[0.07] ring-amber-400/15",
    label: "Tender Alert:",
    body: "Municipal fleet maintenance, Annaberg-Buchholz DE. Relevance score 82/100. Deadline in 14 days.",
  },
];

export const briefItems = [
  { dot: "bg-emerald-400", body: "Reuters: German automotive output +4.1% April — component demand strengthening across CEE" },
  { dot: "bg-amber-400", body: "Handelsblatt (DE): Schaeffler announces Brașov expansion — local supplier search begins Q3" },
  { dot: "bg-orange-300", body: "中国汽车报 (CN): EV tariff retaliation escalating — EU parts supply-chain implications for CEE exporters" },
  { dot: "bg-violet-400", body: "Polymarket: ECB June cut probability 71% · EUR/USD pricing signal for export contracts" },
];
