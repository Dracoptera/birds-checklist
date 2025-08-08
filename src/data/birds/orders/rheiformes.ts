import { Bird } from '../types';

export const rheiformes: Bird[] = [
  {
    id: 'ñandu',
    commonName: 'Ñandú',
    englishName: 'Greater Rhea',
    scientificName: 'Rhea americana',
    size: '150 cm ♂️ | 130 cm ♀️',
    family: 'Rheidae',
    order: 'Rheiformes (Ñandúes)',
    habitat: ['sierra 🏔️', 'monte 🌲', 'pradera 🌿'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    conservationStatus: 'Casi amenazada',
    departamentos: ['Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/627311300/embed',
    cardHeight: { xs: 690, lg: 780, xl: 780 },
    description: {
      general: 'El ñandú es el ave más grande de Sudamérica. A nivel global se encuentra Casi amenazada, pero en Uruguay su estado de conservación es "Preocupación menor".',
      curiosities: 'El macho se reproduce con varias hembras, las cuales depositan todos los huevos en un mismo nido. El macho posteriormente se encarga de la incubación y la cría. Las crías de ñandú tienen el nombre de "charabones".',
    },
    variations: [
      {
        id: 'macho',
        name: 'Macho',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/205637561/embed',
        cardHeight: { xs: 350, lg: 500, xl: 500 },
      },
      {
        id: 'hembra',
        name: 'Hembra',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/628033760/embed',
        cardHeight: { xs: 350, lg: 450, xl: 450 },
      },
    ],
  },
];
