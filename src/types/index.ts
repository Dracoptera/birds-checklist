import { Bird } from '../data/uruguayBirds';

export interface BirdObservation {
  birdId: string;
  bird: Bird;
  seen: boolean;
  hasPhoto: boolean;
  observations: ObservationDetail[];
}

export interface ObservationDetail {
  id: string;
  date: string;
  location: string;
  notes?: string;
  photoUrl?: string;
}

export interface UserData {
  observations: { [birdId: string]: BirdObservation };
  totalSeen: number;
  totalWithPhotos: number;
  lastUpdated: string;
}

export interface FilterOptions {
  seen: 'all' | 'seen' | 'not-seen';
  hasPhoto: 'all' | 'with-photo' | 'without-photo';
  order: string;
  family: string;
  departamento: string;
  commonness: string;
  status: string;
  conservationStatus: string;
  searchTerm: string;
  sortBy: 'commonness' | 'alphabetical' | 'order';
}

export interface Statistics {
  totalBirds: number;
  seenBirds: number;
  birdsWithPhotos: number;
  seenPercentage: number;
  photoPercentage: number;
} 