import { Bird } from '../types';

const ORDER_NAME = 'Galliformes (Gallináceas)';

export const galliformes: Bird[] = [
  {
    id: 'charata',
    commonName: 'Charata',
    englishName: 'Chaco Chachalaca',
    scientificName: 'Ortalis canicollis',
    size: '55 cm',
    family: 'Cracidae',
    order: ORDER_NAME,
    habitat: ['monte 🌲'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'común',
    departamentos: ['Colonia'],  
    conservationStatus: 'Preocupación menor',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/630282346/embed',
    cardHeight: { xs: 690, lg: 770, xl: 770 },
    description: {
        general: 'Ave gregaria, vive en pareja o en pequeños grupos. En Uruguay fue introducida al Parque Anchorena. Solo es común en dicha zona.',
        curiosities: 'En otros países se le conoce como Chacalaca.'
    },
    soundUrl: 'https://macaulaylibrary.org/asset/89185/embed',
  },

  {
    id: 'pava-de-monte',
    commonName: 'Pava de Monte',
    englishName: 'Dusky-legged Guan',
    scientificName: 'Penelope obscura',
    size: '69 cm',
    family: 'Cracidae',
    order: ORDER_NAME,
    habitat: ['monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],  
    conservationStatus: 'Preocupación menor',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/608986444/embed',
    cardHeight: { xs: 690, lg: 770, xl: 770 },
    description: {
        general: 'Ave gregaria, vive en pareja o en pequeños grupos. En Uruguay fue introducida al Parque Anchorena. Solo es común en dicha zona.',
        curiosities: 'En otros países se le conoce como Chacalaca.'
    },
    soundUrl: 'https://macaulaylibrary.org/asset/179854/embed',
  },
];
