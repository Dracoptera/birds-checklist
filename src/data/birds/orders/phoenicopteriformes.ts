import { Bird } from '../types';
import { BIRD_STATUS, COMMONNESS, CONSERVATION_STATUS, ORIGIN } from '../../constants';


const ORDER_NAME = 'Phoenicopteriformes (Flamencos)';

export const phoenicopteriformes: Bird[] = [
  {
    id: 'flamenco-austral',
    commonName: 'Flamenco Austral',
    englishName: 'Chilean Flamingo',
    scientificName: 'Phoenicopterus chilensis',
    size: '75 cm',
    family: 'Phoenicopteridae',
    order: ORDER_NAME,
    habitat: ['bañado 💧'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: {'Rocha': COMMONNESS.POCO_COMUN, 'Maldonado': COMMONNESS.POCO_COMUN, 'Treinta y Tres': COMMONNESS.RARA, 'Cerro Largo': COMMONNESS.RARA, 'Colonia': COMMONNESS.RARA, 'San José': COMMONNESS.RARA, 'Canelones': COMMONNESS.RARA, 'Montevideo': COMMONNESS.RARA},
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],  
    conservationStatus: CONSERVATION_STATUS.CASI_AMENAZADA,
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
    order: ORDER_NAME,
    habitat: ['bañado 💧'],
    status: BIRD_STATUS.OCASIONAL,
    origin: ORIGIN.AUTOCTONA,
    commonness: {'Rocha': COMMONNESS.MUY_RARA, 'Canelones': COMMONNESS.MUY_RARA, 'Artigas': COMMONNESS.MUY_RARA, 'Soriano': COMMONNESS.MUY_RARA},
    departamentos: ['Rocha', 'Canelones', 'Artigas', 'Soriano'],  
    conservationStatus: CONSERVATION_STATUS.VULNERABLE,
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/39515721/embed',
    cardHeight: { xs: 660, lg: 770, xl: 770 },
    soundUrl: 'https://macaulaylibrary.org/asset/167969/embed',
  }
];
