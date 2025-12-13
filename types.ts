export type Theme = 'light' | 'dark' | 'system';

export interface LocationData {
  building: string;
  floor: string;
  confidence: number;
  description?: string;
}

export interface Room {
  id: string;
  name: string;
  floor: string;
  building: string;
  coordinates: { x: number; y: number }; // Percentage 0-100
}

export interface Building {
  id: string;
  name: string;
  floors: string[];
}

export interface NavigationRoute {
  start: LocationData;
  end: Room;
  path: { x: number; y: number }[]; // Simplified path points
  instructions: string[];
}
