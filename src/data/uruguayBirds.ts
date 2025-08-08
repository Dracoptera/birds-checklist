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
  status: '🏠 residente' | 'migratoria invernal ❄️' | 'migratoria estival 🌞' | '🌍 visitante ocasional';
  commonness: 'abundante' | 'común' | 'poco común' | 'rara' | 'muy rara' | { [departamento: string]: 'abundante' | 'común' | 'poco común' | 'rara' | 'muy rara' };
  conservationStatus?: 'Preocupación menor' | 'Vulnerable' | 'En peligro' | 'Casi amenazada' | 'Peligro crítico';
  size?: string;
  origin: 'autóctona' | 'introducida';
  departamentos?: string[];
  characteristics?: string[];
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
    conservationStatus: 'Preocupación menor',
    size: '15-17 cm',
    characteristics: ['nido de barro', 'vocal'],
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
    conservationStatus: 'Preocupación menor',
    size: '11-13 cm',
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
    conservationStatus: 'Preocupación menor',
    size: '23-26 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'pradera 🌿'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    characteristics: ['mimético', 'pico negro'],
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
    conservationStatus: 'Preocupación menor',
    size: '24 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲', 'bañado 💧'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'abundante',
    characteristics: ['amarillo', 'pico negro', 'vocal'],
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
    conservationStatus: 'Preocupación menor',
    size: '15-17 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/191279631/embed',
    variations: [
      {
        id: 'male',
        name: 'Macho ♂️',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/600854461/embed',
      },
      {
        id: 'female',
        name: 'Hembra ♀️',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/428388731/embed',
      },
    ]
  },
  {
    id: 'estornino-pinto',
    commonName: 'Estornino pinto',
    englishName: 'European Starling',
    scientificName: 'Sturnus vulgaris',
    family: 'Sturnidae',
    order: 'Passeriformes (Pájaros)',
    conservationStatus: 'Preocupación menor',
    size: '20-31 cm',
    habitat: ['ciudad 🌆', 'sierra 🏔️'],
    status: '🏠 residente',
    origin: 'introducida',
    commonness: 'común',
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

  // Anseriformes - Waterfowl
  {
    id: 'cisne-cuello-negro',
    commonName: 'Cisne cuello negro',
    englishName: 'Black-Necked Swan',
    scientificName: 'Cygnus melancoryphus',
    family: 'Anatidae',
    order: 'Anseriformes (Patos, Cisnes y Chajás)',
    conservationStatus: 'Preocupación menor',
    size: '100 cm ♂️ | 80 cm ♀️',
    habitat: ['bañado 💧', 'costa 🌊'],
    status: '🏠 residente',
    origin: 'autóctona',
    characteristics: ['cuello negro', 'blanco', 'grande'],
    commonness: {
      'Rocha': 'abundante',
      'Maldonado': 'común',
      'Treinta y Tres': 'común',
      'Cerro Largo': 'común',
      'Lavalleja': 'poco común',
      'Montevideo': 'poco común',
      'Canelones': 'poco común',
      'San José': 'poco común',
      'Colonia': 'poco común',
      'Soriano': 'poco común',
      'Río Negro': 'poco común',
      'Paysandú': 'poco común',
      'Salto': 'poco común',
      'Artigas': 'poco común',
      'Rivera': 'poco común',
      'Tacuarembó': 'poco común',
      'Durazno': 'poco común',
      'Flores': 'poco común',
      'Florida': 'poco común',
    },
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/548065331/embed'
  },
  {
    id: 'coscoroba',
    commonName: 'Coscoroba',
    englishName: 'Coscoroba Swan',
    scientificName: 'Coscoroba coscoroba',
    size: '80 cm ♂️ | 62 cm ♀️',
    family: 'Anatidae',
    order: 'Anseriformes (Patos, Cisnes y Chajás)',
    habitat: ['bañado 💧', 'costa 🌊'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: {
      'Rocha': 'común',
      'Maldonado': 'común',
      'Treinta y Tres': 'común',
      'Cerro Largo': 'común',
      'Lavalleja': 'poco común',
      'Montevideo': 'poco común',
      'Canelones': 'poco común',
      'San José': 'poco común',
      'Colonia': 'poco común',
      'Soriano': 'poco común',
      'Río Negro': 'poco común',
      'Paysandú': 'poco común',
      'Salto': 'poco común',
      'Artigas': 'poco común',
      'Rivera': 'poco común',
      'Tacuarembó': 'poco común',
      'Durazno': 'poco común',
      'Flores': 'poco común',
      'Florida': 'poco común',
    },    
    conservationStatus: 'Preocupación menor',
    characteristics: ['cisne', 'blanco', 'grande'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/259009971/embed',
    description: {
      general: 'Cisne de plumaje blanco. En vuelo son visibles las puntas negras de sus alas.',
      curiosities: 'Su nombre es una onomatopeya que hace referencia a su sonido.',
    }, 
    variations: [
      {
        id: 'adult',
        name: 'Adulto',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/105365391/embed',
        characteristics: ['blanco', 'grande'],
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/259009971/embed',
      },
    ]
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
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/620010230/embed',
    description: {
      general: 'El Pato Barcino es una ave acuática común en Uruguay, conocida por su plumaje verde y blanco.',
      curiosities: 'Es una de las aves más comunes en Uruguay.',
    }
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
    characteristics: ['pico curvo', 'rapaz', 'marrón'],
    habitat: ['ciudad 🌆', 'sierra 🏔️', 'monte 🌲'],
    status: '🏠 residente',
    origin: 'autóctona',
    commonness: 'común',
    conservationStatus: 'Preocupación menor',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/568347481/embed',
    variations: [
      {
        id: 'adult',
        name: 'Adulto',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/612501251/embed',
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/448561191/embed',
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

// Utility function to get commonness for a specific department
export const getCommonnessForDepartment = (bird: Bird, departamento?: string): string => {
  if (typeof bird.commonness === 'string') {
    return bird.commonness;
  }
  
  if (!departamento) {
    // If no department specified, calculate the most common (majority) level
    const levels = Object.values(bird.commonness);
    const levelCounts: { [key: string]: number } = {};
    
    // Count occurrences of each level
    levels.forEach(level => {
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    
    // Find the level with the highest count
    let mostCommonLevel = 'rara'; // default fallback
    let maxCount = 0;
    
    Object.entries(levelCounts).forEach(([level, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonLevel = level;
      }
    });
    
    return mostCommonLevel;
  }
  
  return bird.commonness[departamento] || 'rara';
};

// Utility function to get all unique commonness levels from a bird
export const getAllCommonnessLevels = (bird: Bird): string[] => {
  if (typeof bird.commonness === 'string') {
    return [bird.commonness];
  }
  
  return Array.from(new Set(Object.values(bird.commonness)));
};

// Utility function to get departments for a bird
export const getDepartamentosForBird = (bird: Bird): string[] => {
  // If bird has explicit departamentos array, use it
  if (bird.departamentos) {
    return bird.departamentos;
  }
  
  // If bird has department-specific commonness, derive departments from it
  if (typeof bird.commonness === 'object') {
    return Object.keys(bird.commonness);
  }
  
  // If bird has single commonness, it's found in all departments (or we don't have specific data)
  return [];
}; 