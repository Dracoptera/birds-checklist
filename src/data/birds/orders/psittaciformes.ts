import { Bird } from '../types';

const ORDER_NAME = 'Psittaciformes (Loros)';

export const psittaciformes: Bird[] = [
  {
    id: 'cotorra',
    commonName: 'Cotorra',
    englishName: 'Monk Parakeet',
    scientificName: 'Myiopsitta monachus',
    size: '27 cm',
    family: 'Psittacidae',
    order: ORDER_NAME,
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    conservationStatus: 'Preocupación menor',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497548/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/195143221/embed',
  },
];
