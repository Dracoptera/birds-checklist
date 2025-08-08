export interface BirdVariation {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  ebirdEmbedUrl?: string;
  characteristics?: string[];
}

export interface Bird {
  id: string;
  commonName: string;
  englishName: string;
  scientificName: string;
  family: string;
  order: string;
  habitat: string[];
  status: '🏠 residente' | 'migratoria invernal ❄️' | 'migratoria estival 🌞' | 'visitante 🌍';
  commonness: 'abundante' | 'común' | 'poco común' | 'rara' | 'muy rara';
  size?: string;
  origin: 'autóctona' | 'introducida';
  departamentos?: string[];
  imageUrl?: string;
  ebirdEmbedUrl?: string;
  soundUrl?: string;
  variations?: BirdVariation[];
  // Detailed information for bird detail page
  description?: {
    general?: string;
    behavior?: {
      feeding?: string;
      reproduction?: string;
      social?: string;
    };
    distribution?: {
      presence?: string;
      preferredHabitats?: string;
      conservation?: string;
    };
    curiosities?: string;
    seasonalPatterns?: {
      spring?: string;
      summer?: string;
      autumn?: string;
      winter?: string;
    };
  };
}

export const uruguayBirds: Bird[] = [
  // Passeriformes - Passerines (Pájaros)
  {
    id: 'hornero',
    commonName: 'Hornero',
    englishName: 'Rufous Hornero',
    scientificName: 'Furnarius rufus',
    family: 'Furnariidae',
    order: 'Passeriformes (Pájaros)',
    habitat: ['ciudad 🌆', 'monte 🌲', 'pradera 🌿'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    size: '15-17 cm',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/70049451/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/203695301/embed',
    description: {
      general: 'El Hornero es una de las aves más emblemáticas de Uruguay, conocida por construir nidos de barro en forma de horno. Su plumaje es principalmente rufo (rojizo-marrón) con partes inferiores más claras. Es un ave territorial y muy vocal, especialmente durante la época reproductiva.',
      curiosities: 'El nido de los horneros dura aproximadamente un año y llega a ser utilizado por otras especies.',
    }
  },
  {
    id: 'ratonera',
    commonName: 'Ratonera',
    englishName: 'Southern House Wren',
    scientificName: 'Troglodytes musculus',
    family: 'Troglodytidae',
    order: 'Passeriformes (Pájaros)',
    habitat: ['ciudad 🌆', 'pradera 🌿', 'monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/613154785/embed'
  },
  {
    id: 'calandria',
    commonName: 'Calandria',
    englishName: 'Chalk-Browed Mockingbird',
    scientificName: 'Mimus saturninus',
    family: 'Mimidae',
    order: 'Passeriformes (Pájaros)',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'pradera 🌿'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497654/embed',
    soundUrl: 'https://macaulaylibrary.org/asset/638497654/embed',
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
    order: 'Passeriformes (Pájaros)',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲', 'bañado 💧'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497636/embed'
  },
  {
    id: 'gorrión',
    commonName: 'Gorrión',
    englishName: 'House Sparrow',
    scientificName: 'Passer domesticus',
    family: 'Passeridae',
    order: 'Passeriformes (Pájaros)',
    habitat: ['ciudad 🌆', 'sierra 🏔️'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/191279631/embed'
  },
  {
    id: 'estornino-pinto',
    commonName: 'Estornino pinto',
    englishName: 'European Starling',
    scientificName: 'Sturnus vulgaris',
    family: 'Sturnidae',
    order: 'Passeriformes (Pájaros)',
    habitat: ['ciudad 🌆', 'sierra 🏔️'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/158542881/embed'
  },

  // Anseriformes - Waterfowl
  {
    id: 'cisne-cuello-negro',
    commonName: 'Cisne cuello negro',
    englishName: 'Black-Necked Swan',
    scientificName: 'Cygnus melancoryphus',
    family: 'Anatidae',
    order: 'Anseriformes (Patos, Cisnes y Chajás)',
    habitat: ['bañado 💧', 'costa 🌊'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/548065331/embed'
  },
  {
    id: 'coscoroba',
    commonName: 'Coscoroba',
    englishName: 'Coscoroba Swan',
    scientificName: 'Coscoroba coscoroba',
    family: 'Anatidae',
    order: 'Anseriformes (Patos, Cisnes y Chajás)',
    habitat: ['bañado 💧', 'costa 🌊'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'rara',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/259009971/embed'
  },
  {
    id: 'pato-barcino',
    commonName: 'Pato barcino',
    englishName: 'Brazilian Teal',
    scientificName: 'Amazonetta brasiliensis',
    family: 'Anatidae',
    order: 'Anseriformes (Patos, Cisnes y Chajás)',
    habitat: ['bañado 💧', 'costa 🌊'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/620010230/embed'
  },

  // Ciconiiformes - Storks and Herons
  {
    id: 'garza-mora',
    commonName: 'Garza mora',
    englishName: 'Cocoi Heron',
    scientificName: 'Ardea cocoi',
    family: 'Ardeidae',
    order: 'Pelecaniformes (Garzas, Cuervillos y Espátulas)',
    habitat: ['bañado 💧', 'costa 🌊'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/469277011/embed'
  },

  // Accipitriformes - Birds of Prey

  {
    id: 'gavilan-comun',
    commonName: 'Gavilán común',
    englishName: 'Roadside Hawk',
    scientificName: 'Rupornis magnirostris',
    family: 'Accipitridae',
    order: 'Accipitriformes (Águilas y Gavilanes)',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/568347481/embed',
    variations: [
      {
        id: 'adult',
        name: 'Adulto',
        description: 'Plumaje completo del adulto',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/612501251/embed',
        characteristics: ['Plumaje rufo uniforme', 'Pico negro', 'Patas grises']
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        description: 'Plumaje juvenil más pálido',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/448561191/embed',
        characteristics: ['Plumaje más pálido', 'Pico más claro', 'Menos contraste']
      }
    ]
  },

  // Charadriiformes - Shorebirds (Playeras)
  {
    id: 'tero',
    commonName: 'Tero',
    englishName: 'Southern Lapwing',
    scientificName: 'Vanellus chilensis',
    family: 'Charadriidae',
    order: 'Charadriiformes (Playeras)',
    habitat: ['pradera 🌿', 'sierra 🏔️', 'ciudad 🌆'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/442325471/embed'
  },

  // Columbiformes - Pigeons and Doves
  {
    id: 'paloma-ala-manchada',
    commonName: 'Paloma ala manchada',
    englishName: 'Spot-Winged Pigeon',
    scientificName: 'Patagioenas maculosa',
    family: 'Columbidae',
    order: 'Columbiformes (Palomas)',
    habitat: ['monte 🌲', 'sierra 🏔️'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617404122/embed'
  },
  {
    id: 'torcaza',
    commonName: 'Torcaza',
    englishName: 'Eared Dove',
    scientificName: 'Zenaida auriculata',
    family: 'Columbidae',
    order: 'Columbiformes (Palomas)',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'pradera 🌿'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617987187/embed'
  },

  // Psittaciformes - Parrots
  {
    id: 'cotorra',
    commonName: 'Cotorra',
    englishName: 'Monk Parakeet',
    scientificName: 'Myiopsitta monachus',
    family: 'Psittacidae',
    order: 'Psittaciformes (Loros)',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497548/embed'
  },

  // Piciformes - Woodpeckers
  {
    id: 'carpintero-campestre',
    commonName: 'Carpintero de campo',
    englishName: 'Campo Flicker',
    scientificName: 'Colaptes campestris',
    family: 'Picidae',
    order: 'Piciformes (Carpinteros)',
    habitat: ['pradera 🌿', 'sierra 🏔️'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/627431204/embed'
  },

  // Coraciiformes - Kingfishers
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
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/174809481/embed'
  },
];

export const getBirdsByOrder = () => {
  const birdsByOrder: { [key: string]: Bird[] } = {};
  uruguayBirds.forEach(bird => {
    if (!birdsByOrder[bird.order]) {
      birdsByOrder[bird.order] = [];
    }
    birdsByOrder[bird.order].push(bird);
  });
  return birdsByOrder;
};

export const getBirdsByFamily = () => {
  const birdsByFamily: { [key: string]: Bird[] } = {};
  uruguayBirds.forEach(bird => {
    if (!birdsByFamily[bird.family]) {
      birdsByFamily[bird.family] = [];
    }
    birdsByFamily[bird.family].push(bird);
  });
  return birdsByFamily;
}; 