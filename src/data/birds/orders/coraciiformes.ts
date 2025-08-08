import { Bird } from '../types';

export const coraciiformes: Bird[] = [
  {
    id: 'martin-pescador-grande',
    commonName: 'Martín pescador grande',
    englishName: 'Ringed Kingfisher',
    scientificName: 'Megaceryle torquata',
    family: 'Alcedinidae',
    order: 'Coraciiformes (Martín pescador)',
    habitat: ['bañado 💧', 'costa 🌊'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: {
      'Rocha': 'abundante',
      'Maldonado': 'común',
      'Treinta y Tres': 'común',
      'Lavalleja': 'poco común',
      'Rivera': 'rara',
      'Artigas': 'muy rara'
    },
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/174809481/embed'
  },
];
