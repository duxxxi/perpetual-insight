import { useSyncExternalStore } from "react";

export type ConvMessage = {
  role: "user" | "assistant";
  text: string;
  at: number;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ConvMessage[];
};

const KEY = "perpetuity.conversations.v1";

function load(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
  }
}

let conversations: Conversation[] = load();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(conversations));
  } catch {
    /* ignore quota */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function titleFromText(t: string) {
  const trimmed = t.trim().replace(/\s+/g, " ");
  return trimmed.length > 70 ? trimmed.slice(0, 67) + "…" : trimmed;
}

export const conversationStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot(): Conversation[] {
    return conversations;
  },
  start(firstMessage: string): Conversation {
    const now = Date.now();
    const conv: Conversation = {
      id: `c_${now.toString(36)}`,
      title: titleFromText(firstMessage) || "New conversation",
      createdAt: now,
      updatedAt: now,
      messages: [{ role: "user", text: firstMessage, at: now }],
    };
    conversations = [conv, ...conversations];
    emit();
    return conv;
  },
  append(id: string, msg: ConvMessage) {
    conversations = conversations.map((c) =>
      c.id === id
        ? { ...c, messages: [...c.messages, msg], updatedAt: msg.at }
        : c,
    );
    emit();
  },
  get(id: string): Conversation | undefined {
    return conversations.find((c) => c.id === id);
  },
  remove(id: string) {
    conversations = conversations.filter((c) => c.id !== id);
    emit();
  },
};

export function useConversations(): Conversation[] {
  return useSyncExternalStore(
    conversationStore.subscribe,
    conversationStore.getSnapshot,
    () => [],
  );
}
