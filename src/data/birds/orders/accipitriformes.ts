import { Bird } from '../types';

const ORDER_NAME = 'Accipitriformes (Águilas y Gavilanes)';

export const accipitriformes: Bird[] = [
  {
    id: 'gavilan-comun',
    commonName: 'Gavilán Común',
    englishName: 'Roadside Hawk',
    scientificName: 'Rupornis magnirostris',
    size: '38 cm',
    family: 'Accipitridae',
    order: ORDER_NAME,
    characteristics: ['rapaz', 'marrón'],
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],  
    conservationStatus: 'Preocupación menor',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/568347481/embed',
    cardHeight: { xs: 750, lg: 780, xl: 780 },
    variations: [
      {
        id: 'adult',
        name: 'Adulto',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/612501251/embed',
        cardHeight: { xs: 350, lg: 500, xl: 500 },
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/448561191/embed',
        cardHeight: { xs: 300, lg: 500, xl: 500 },
      }
    ]
  },
];
