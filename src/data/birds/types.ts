export interface BirdVariation {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  ebirdEmbedUrl?: string;
  characteristics?: string[];
  cardHeight?: number | { xs: number; lg: number; xl: number };
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  ebirdEmbedUrl?: string;
  cardHeight?: number | { xs: number; lg: number; xl: number };
}

export interface Bird {
  id: string;
  commonName: string;
  englishName: string;
  scientificName: string;
  family: string;
  order: string;
  habitat: string[];
  status: '🏠 residente' | '❄️ visitante invernal' | '🌞 visitante estival' | '🌍 visitante ocasional';
  commonness: 'abundante' | 'común' | 'poco común' | 'rara' | 'muy rara' | { [departamento: string]: 'abundante' | 'común' | 'poco común' | 'rara' | 'muy rara' };
  conservationStatus?: 'Preocupación menor' | 'Vulnerable' | 'En peligro' | 'Casi amenazada' | 'Peligro crítico';
  uruguayConservationStatus?: 'Amenazada' | 'En peligro' | 'Casi amenazada' | 'Peligro crítico';
  size?: string;
  origin: 'autóctona' | 'introducida';
  departamentos?: string[];
  characteristics?: string[];
  imageUrl?: string;
  ebirdEmbedUrl?: string;
  soundUrl?: string;
  variations?: BirdVariation[];
  gallery?: GalleryImage[];
  cardHeight?: number | { xs: number; lg: number; xl: number };
  // Detailed information for bird detail page
  description?: {
    general?: string;
    behavior?: {
      feeding?: string;
      reproduction?: string;
      social?: string;
    };
    distribution?: {
      presence?: string;
      preferredHabitats?: string;
      conservation?: string;
    };
    curiosities?: string;
    seasonalPatterns?: {
      spring?: string;
      summer?: string;
      autumn?: string;
      winter?: string;
    };
  };
}
