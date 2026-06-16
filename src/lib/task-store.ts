import { useSyncExternalStore } from "react";

export type UserTask = {
  id: string;
  title: string;
  body?: string;
  tag: string;
  createdAt: number;
  done: boolean;
};

let tasks: UserTask[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const taskStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot(): UserTask[] {
    return tasks;
  },
  add(input: { title: string; body?: string; tag?: string }) {
    const t: UserTask = {
      id: `u_${Date.now().toString(36)}`,
      title: input.title,
      body: input.body,
      tag: input.tag ?? "Inbox",
      createdAt: Date.now(),
      done: false,
    };
    tasks = [t, ...tasks];
    emit();
    return t;
  },
  toggle(id: string) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    emit();
  },
  remove(id: string) {
    tasks = tasks.filter((t) => t.id !== id);
    emit();
  },
};

export function useUserTasks(): UserTask[] {
  return useSyncExternalStore(taskStore.subscribe, taskStore.getSnapshot, taskStore.getSnapshot);
}
