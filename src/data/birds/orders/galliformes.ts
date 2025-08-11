import { Bird } from '../types';

export const galliformes: Bird[] = [
  {
    id: 'charata',
    commonName: 'Charata',
    englishName: 'Chaco Chachalaca',
    scientificName: 'Ortalis canicollis',
    size: '55 cm',
    family: 'Cracidae',
    order: 'Galliformes (Gallináceas)',
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
];
