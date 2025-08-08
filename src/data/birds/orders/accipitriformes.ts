import { Bird } from '../types';

export const accipitriformes: Bird[] = [
  {
    id: 'gavilan-comun',
    commonName: 'Gavilán común',
    englishName: 'Roadside Hawk',
    scientificName: 'Rupornis magnirostris',
    family: 'Accipitridae',
    order: 'Accipitriformes (Águilas y Gavilanes)',
    characteristics: ['pico curvo', 'rapaz', 'marrón'],
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    conservationStatus: 'Preocupación menor',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/568347481/embed',
    variations: [
      {
        id: 'adult',
        name: 'Adulto',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/612501251/embed',
        cardHeight: { xs: 600, lg: 650, xl: 700 },
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/448561191/embed',
        cardHeight: { xs: 550, lg: 600, xl: 650 },
      }
    ]
  },
];
