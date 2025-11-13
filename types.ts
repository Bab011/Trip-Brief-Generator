
export type Tone = 'Luxury' | 'Adventure' | 'Family';

export interface Itinerary {
  title: string;
  destination: string;
  dates: string;
  summary: string;
  inclusions: string[];
  exclusions: string[];
  cost: string;
}

export interface Project {
  id: string;
  name: string;
  lastUpdated: string;
}
