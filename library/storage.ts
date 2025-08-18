import type { Plant } from "./types";

const KEY = "gro:plants";

export function getPlants(): Plant[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Plant[]) : [];
  } catch {
    return [];
  }
}

export function savePlants(plants: Plant[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(plants));
}

export function addPlant(newPlant: Plant) {
  const current = getPlants();
  savePlants([newPlant, ...current]);
}

export function removePlant(id: string) {
  const next = getPlants().filter((p) => p.id !== id);
  savePlants(next);
}

export function updatePlant(id: string, patch: Partial<Plant>) {
  const next = getPlants().map((p) => (p.id === id ? { ...p, ...patch } : p));
  savePlants(next);
}
export function getPlantById(id: string): Plant | undefined {
  return getPlants().find((p) => p.id === id);
}
