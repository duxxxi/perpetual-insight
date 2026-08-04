import { useSyncExternalStore } from "react";

export type ContextAsk = {
  id: string;
  question: string;
  why: string;
  field: string;
  placeholder: string;
  answer?: string;
};

export type ContextFact = {
  id: string;
  group: string;
  label: string;
  value: string;
  source: string;
};

const initialAsks: ContextAsk[] = [
  {
    id: "ask_incoterms",
    question: "Which Incoterms do you default to for EU buyers?",
    why: "Lets Perpetuity price quotes and draft contracts without asking every time.",
    field: "Default Incoterms",
    placeholder: "e.g. FCA Skopje, DAP buyer warehouse…",
  },
  {
    id: "ask_margin",
    question: "What is your minimum acceptable gross margin per order?",
    why: "Used to auto-flag tenders and buyer counter-offers that fall below your floor.",
    field: "Margin floor",
    placeholder: "e.g. 14% on softwood, 9% on pulp",
  },
  {
    id: "ask_capacity",
    question: "What is your monthly shippable capacity right now?",
    why: "Needed before Perpetuity commits volumes in outreach or tender replies.",
    field: "Monthly capacity",
    placeholder: "e.g. 900t softwood, 300t pulp",
  },
  {
    id: "ask_markets",
    question: "Which markets are off-limits for compliance or payment risk?",
    why: "Filters opportunities and outreach so nothing lands that you cannot execute.",
    field: "Excluded markets",
    placeholder: "e.g. RU, BY, prepayment-only for EG",
  },
  {
    id: "ask_decider",
    question: "Who signs off on quotes above €50k?",
    why: "Routes approvals to the right person instead of parking them in your inbox.",
    field: "Approver",
    placeholder: "e.g. Stevan, then finance",
  },
];

const facts: ContextFact[] = [
  { id: "f1", group: "Company", label: "Business", value: "Perpetuity — timber, pulp & paper export brokerage", source: "Onboarding" },
  { id: "f2", group: "Company", label: "Home base", value: "Skopje · secondary desk Bratislava", source: "Onboarding" },
  { id: "f3", group: "Markets", label: "Active", value: "EU (DE, PL, AT), CIS, SEA, LATAM", source: "Contacts + outreach history" },
  { id: "f4", group: "Markets", label: "Watching", value: "Turkey, Egypt — freight sensitive", source: "Inferred from reading history" },
  { id: "f5", group: "Products", label: "Core SKUs", value: "Softwood sawn, kraft pulp, containerboard", source: "Documents" },
  { id: "f6", group: "Products", label: "Certifications", value: "FSC, REACH file on record", source: "Documents" },
  { id: "f7", group: "Commercial", label: "Currency", value: "EUR primary, USD invoicing for LATAM", source: "Threads" },
  { id: "f8", group: "Commercial", label: "Payment terms", value: "30% advance, balance on B/L copy", source: "Outreach templates" },
  { id: "f9", group: "Operating", label: "Working hours", value: "07:30 – 19:00 CET, EU-first", source: "Calendar" },
  { id: "f10", group: "Operating", label: "Tone", value: "Direct, short, no filler in buyer emails", source: "Learned from edits" },
];

let asks: ContextAsk[] = initialAsks;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const contextStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot(): ContextAsk[] {
    return asks;
  },
  answer(id: string, answer: string) {
    asks = asks.map((a) => (a.id === id ? { ...a, answer } : a));
    emit();
  },
  skip(id: string) {
    asks = asks.filter((a) => a.id !== id);
    emit();
  },
  facts(): ContextFact[] {
    return facts;
  },
};

export function useContextAsks(): ContextAsk[] {
  return useSyncExternalStore(contextStore.subscribe, contextStore.getSnapshot, contextStore.getSnapshot);
}

export function useOpenAsks(): ContextAsk[] {
  return useContextAsks().filter((a) => !a.answer);
}
