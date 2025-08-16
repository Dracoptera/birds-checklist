import { Bird } from '../types';

const ORDER_NAME = 'Charadriiformes (Playeras)';

export const charadriiformes: Bird[] = [
  {
    id: 'tero',
    commonName: 'Tero',
    englishName: 'Southern Lapwing',
    scientificName: 'Vanellus chilensis',
    size: '32 cm',
    family: 'Charadriidae',
    order: ORDER_NAME,
    habitat: ['pradera 🌿', 'sierra 🏔️', 'ciudad 🌆'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    conservationStatus: 'Preocupación menor',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/442325471/embed',
    cardHeight: { xs: 680, lg: 780, xl: 780 },
    soundUrl: 'https://macaulaylibrary.org/asset/189516/embed',
    description: {
      general: 'Una de las aves más representativas de Uruguay gran parte de Sudamérica. Su inconfundible vocalización es una onomatopeya de su nombre: "terotero", que se escucha por todo el país.',
      curiosities: 'Son muy territoriales. Poseen espolones en las alas, que utilizan para defender su territorio y nido. Una de sus estrategias de protección de nido es simular que está en otro lugar, y hasta simular estar heridos para ser una presa más fácil que su nido.',
    }
  },
];
