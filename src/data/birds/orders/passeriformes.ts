import { Bird } from '../types';
import { BIRD_STATUS, COMMONNESS, CONSERVATION_STATUS, ORIGIN } from '../../constants';


const ORDER_NAME = 'Passeriformes (Pájaros)';

export const passeriformes: Bird[] = [
  {
    id: 'hornero',
    commonName: 'Hornero',
    englishName: 'Rufous Hornero',
    scientificName: 'Furnarius rufus',
    family: 'Furnariidae',
    order: ORDER_NAME,
    habitat: ['ciudad 🌆', 'monte 🌲', 'pradera 🌿'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.ABUNDANTE,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    size: '15-17 cm',
    characteristics: ['nido de barro', 'vocal'],
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/640065072/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/203695301/embed',
    cardHeight: { xs: 710, lg: 780, xl: 780 },
    description: {
      general: 'El Hornero es una de las aves más emblemáticas de Uruguay, conocida por construir nidos de barro en forma de horno. Su plumaje es principalmente rufo (rojizo-marrón) con partes inferiores más claras. Es un ave territorial y muy vocal, especialmente durante la época reproductiva.',
      curiosities: 'El nido de los horneros dura aproximadamente un año y llega a ser utilizado por otras especies.',
    },
    gallery: [
      {
        id: 'nido',
        title: 'Nido de Hornero',
        description: 'Nido característico en forma de horno.',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/70049451/embed',
        cardHeight: { xs: 380, lg: 550, xl: 550 }
      }
    ]
  },
  {
    id: 'ratonera',
    commonName: 'Ratonera',
    englishName: 'Southern House Wren',
    scientificName: 'Troglodytes musculus',
    family: 'Troglodytidae',
    order: ORDER_NAME,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    size: '11-13 cm',
    habitat: ['ciudad 🌆', 'pradera 🌿', 'monte 🌲'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.ABUNDANTE,
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/613154785/embed'
  },
  {
    id: 'calandria',
    commonName: 'Calandria',
    englishName: 'Chalk-Browed Mockingbird',
    scientificName: 'Mimus saturninus',
    family: 'Mimidae',
    order: ORDER_NAME,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    size: '23-26 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'pradera 🌿'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.ABUNDANTE,
    characteristics: ['mimético', 'pico negro'],
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497654/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/310087131/embed',
    description: {
      general: 'La Calandria es un ave muy común en Uruguay, conocida por su habilidad para imitar el canto de otras aves. Su plumaje es principalmente gris y blanco, con un pico y negro.',
      curiosities: 'Es frecuentemente parasitada por el Tordo Común.',
    }
  },
  {
    id: 'benteveo',
    commonName: 'Benteveo',
    englishName: 'Great Kiskadee',
    scientificName: 'Pitangus sulphuratus',
    family: 'Tyrannidae',
    order: ORDER_NAME,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    size: '24 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲', 'bañado 💧'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.ABUNDANTE,
    characteristics: ['amarillo', 'pico negro', 'vocal'],
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497636/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/208140991/embed',
    description: {
      general: 'Un ave muy común y altamente vocal. Muy territorial; cuando se enfrenta a alguna amenaza, expone una cresta color amarillo. Se enfrenta a otras aves y animales para defender su nido, incluso aves de mucho mayor tamaño y parásitos de cría como el Tordo Común. Su alimentación es omnívora y variada: se le puede ver pescando y hasta azotando pequeños animales contra el piso. También come insectos y frutas.',
      curiosities: 'En otros países tiene nombres como Bienteveo, Bichofue, Pitogüé y Cristofué: todos hacen referencia a su canto. En Uruguay también lo llaman "Bicho Feo" por este mismo motivo.',
    },
    gallery: [
      {
        id: 'cresta',
        title: 'Cresta amarilla visible',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/258297611/embed',
        cardHeight: { xs: 380, lg: 550, xl: 550 }
      },
      {
        id: 'presa',
        title: 'Depredando un murciélago',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/204565011/embed',
        cardHeight: { xs: 380, lg: 550, xl: 550 }
      } 
    ]
  },
  {
    id: 'gorrión',
    commonName: 'Gorrión',
    englishName: 'House Sparrow',
    scientificName: 'Passer domesticus',
    family: 'Passeridae',
    order: ORDER_NAME,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    size: '15-17 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.INTRODUCIDA,
    commonness: COMMONNESS.ABUNDANTE,
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/640064928/embed',
    variations: [
      {
        id: 'male',
        name: 'Macho ♂️',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/600854461/embed',
        cardHeight: { xs: 360, lg: 450, xl: 450 },
      },
      {
        id: 'female',
        name: 'Hembra ♀️',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/428388731/embed',
        cardHeight: { xs: 380, lg: 450, xl: 450 },
      },
    ]
  },
  {
    id: 'estornino-pinto',
    commonName: 'Estornino Pinto',
    englishName: 'European Starling',
    scientificName: 'Sturnus vulgaris',
    family: 'Sturnidae',
    order: ORDER_NAME,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    size: '20-31 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️'],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.INTRODUCIDA,
    commonness: COMMONNESS.COMUN,
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/158542881/embed',
    variations: [
      {
        id: 'adult',
        name: 'Adulto - Plumaje Nupcial',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/205138871/embed',
      },
      {
        id: 'adult',
        name: 'Adulto - Plumaje no reproductivo',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/39278421/embed',
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/171399331/embed',
      },
    ],
  },
];
