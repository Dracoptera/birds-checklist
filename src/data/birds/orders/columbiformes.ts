import { Bird } from '../types';

export const columbiformes: Bird[] = [
  {
    id: 'paloma-ala-manchada',
    commonName: 'Paloma ala manchada',
    englishName: 'Spot-Winged Pigeon',
    scientificName: 'Patagioenas maculosa',
    family: 'Columbidae',
    order: 'Columbiformes (Palomas)',
    habitat: ['monte 🌲', 'sierra 🏔️'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617404122/embed'
  },
  {
    id: 'torcaza',
    commonName: 'Torcaza',
    englishName: 'Eared Dove',
    scientificName: 'Zenaida auriculata',
    family: 'Columbidae',
    order: 'Columbiformes (Palomas)',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'pradera 🌿'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617987187/embed'
  },
];
