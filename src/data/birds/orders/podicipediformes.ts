import { Bird } from '../types';

export const podicipediformes: Bird[] = [
  {
    id: 'maca-comun',
    commonName: 'Macá Común',
    englishName: 'White-tufted Grebe',
    scientificName: 'Rollandia rolland',
    size: '25 cm',
    family: 'Podicipedidae',
    order: 'Podicipediformes (Macáes)',
    habitat: ['bañado 💧'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Paysandú', 'Artigas', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja'],  
    conservationStatus: 'Preocupación menor',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/252673091/embed',
    cardHeight: { xs: 710, lg: 770, xl: 770 },
    soundUrl: 'https://macaulaylibrary.org/asset/204018361/embed',
  },

  {
    id: 'maca-gris',
    commonName: 'Macá Gris',
    englishName: 'Least Grebe',
    scientificName: 'Tachybaptus dominicus',
    size: '21 cm',
    family: 'Podicipedidae',
    order: 'Podicipediformes (Macáes)',
    habitat: ['bañado 💧'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'poco común',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Paysandú', 'Artigas', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],  
    conservationStatus: 'Preocupación menor',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/176554261/embed',
    cardHeight: { xs: 670, lg: 770, xl: 770 },
    description: {
        curiosities: 'Es el macá más pequeño del mundo.'
    },
    soundUrl: 'https://macaulaylibrary.org/asset/79953411/embed',
  },
];
