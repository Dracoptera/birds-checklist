import { Bird } from '../types';
import { BIRD_STATUS, COMMONNESS, CONSERVATION_STATUS, ORIGIN } from '../../constants';


const ORDER_NAME = 'Coraciiformes (Martín pescador)';

export const coraciiformes: Bird[] = [
  {
    id: 'martin-pescador-grande',
    commonName: 'Martín Pescador Grande',
    englishName: 'Ringed Kingfisher',
    scientificName: 'Megaceryle torquata',
    size: '36 cm',
    family: 'Alcedinidae',
    order: ORDER_NAME,
    habitat: ['bañado 💧', 'costa 🌊'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    commonness: COMMONNESS.COMUN,
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/174809481/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/211555/embed',
  },
];
