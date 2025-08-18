export type Plant = {
  id: string;
  name: string;
  imageData?: string;
  wateringIntervalDays?: number;
  lastWatered?: string;
  notes?: string;
};

export type PlantCollection = {
  id: string;
  title: string;
  plants: Plant[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  collections: PlantCollection[];
};
