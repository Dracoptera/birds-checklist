import { BIRD_STATUS, COMMONNESS, CONSERVATION_STATUS, ORIGIN } from '../../constants';
import { Bird } from '../types';

const ORDER_NAME = 'Columbiformes (Palomas)';

export const columbiformes: Bird[] = [
  {
    id: 'paloma-ala-manchada',
    commonName: 'Paloma Ala Manchada',
    englishName: 'Spot-Winged Pigeon',
    size: '33 cm',
    scientificName: 'Patagioenas maculosa',
    family: 'Columbidae',
    order: ORDER_NAME,
    habitat: ['monte 🌲', 'sierra 🏔️'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.COMUN,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617404122/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/212950/embed',
    description: {
      general: 'Paloma de plumaje gris con manchas blancas en las alas y patas rojas. Se distribuye por Perú, Bolivia, Paraguay, Argentina, Brasil y Uruguay.".',
      curiosities: 'Se alimenta de semillas y materia vegetal.',
    }
  },
  {
    id: 'torcaza',
    commonName: 'Torcaza',
    englishName: 'Eared Dove',
    size: '22-28 cm',
    scientificName: 'Zenaida auriculata',
    family: 'Columbidae',
    order: ORDER_NAME,
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'pradera 🌿'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.ABUNDANTE,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617987187/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/212919/embed',
    description: {
      general: 'Paloma nativa de Sudamérica, y la más común en Uruguay, donde es considerada plaga. Tiene marcas negras en el ala, lo cual la diferencia (además de por su mayor tamaño) de la Torcacita.',
      curiosities: 'En Córdoba, Argentina, se cazan en grandes números debido a ser una plaga. Parte de su éxito reproductivo se debe a que puede anidar todo el año, mientras haya suficiente alimento.',
    }
  },
];
