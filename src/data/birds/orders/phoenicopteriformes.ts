import { Bird } from '../types';

export const phoenicopteriformes: Bird[] = [
  {
    id: 'flamenco-austral',
    commonName: 'Flamenco Austral',
    englishName: 'Chilean Flamingo',
    scientificName: 'Phoenicopterus chilensis',
    size: '75 cm',
    family: 'Phoenicopteridae',
    order: 'Phoenicopteriformes (Flamencos)',
    habitat: ['bañado 💧'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: {'Rocha': 'poco común', 'Maldonado': 'poco común', 'Treinta y Tres': 'rara', 'Cerro Largo': 'rara', 'Colonia': 'rara', 'San José': 'rara', 'Canelones': 'rara', 'Montevideo': 'rara'},
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],  
    conservationStatus: 'Casi amenazada',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/156019291/embed',
    cardHeight: { xs: 710, lg: 770, xl: 770 },
    soundUrl: 'https://macaulaylibrary.org/asset/29396/embed',
  },

  {
    id: 'flamenco-andino',
    commonName: 'Flamenco Andino',
    englishName: 'Andean Flamingo',
    scientificName: 'Phoenicopterus andinus',
    size: '75 cm',
    family: 'Phoenicopteridae',
    order: 'Phoenicopteriformes (Flamencos)',
    habitat: ['bañado 💧'],
    status: '🌍 visitante ocasional',
    origin: 'autóctona',
    commonness: {'Rocha': 'muy rara', 'Canelones': 'muy rara', 'Artigas': 'muy rara', 'Soriano': 'muy rara'},
    departamentos: ['Rocha', 'Canelones', 'Artigas', 'Soriano'],  
    conservationStatus: 'Vulnerable',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/39515721/embed',
    cardHeight: { xs: 660, lg: 770, xl: 770 },
    soundUrl: 'https://macaulaylibrary.org/asset/167969/embed',
  }
];
