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
  scientificName: string;
  family: string;
  order: string;
  habitat: string[];
  status: 'residente' | 'migratoria' | 'visitante';
  commonness: 'abundante' | 'común' | 'poco común' | 'rara' | 'muy rara';
  departamentos?: string[];
  imageUrl?: string;
  ebirdEmbedUrl?: string;
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
    sounds?: {
      song?: string;
      calls?: string;
      season?: string;
    };
    seasonalPatterns?: {
      spring?: string;
      summer?: string;
      autumn?: string;
      winter?: string;
    };
  };
}

export const uruguayBirds: Bird[] = [
  // Passeriformes - Passerines
  {
    id: 'rufous-hornero',
    commonName: 'Hornero',
    scientificName: 'Furnarius rufus',
    family: 'Furnariidae',
    order: 'Passeriformes',
    habitat: ['urbana', 'rural', 'pradera'],
    status: 'residente',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/314971271/embed',
    description: {
      general: 'El Hornero es una de las aves más emblemáticas de Uruguay, conocida por construir nidos de barro en forma de horno. Su plumaje es principalmente rufo (rojizo-marrón) con partes inferiores más claras. Es un ave territorial y muy vocal, especialmente durante la época reproductiva.',
      behavior: {
        feeding: 'Principalmente insectívoro, busca alimento en el suelo y en la vegetación baja. Consume insectos, arañas, larvas y ocasionalmente semillas pequeñas.',
        reproduction: 'Construye nidos de barro en forma de horno, generalmente en postes, árboles o estructuras humanas. La época de cría se extiende de agosto a diciembre, con 2-3 nidadas por temporada.',
        social: 'Generalmente en parejas territoriales durante la reproducción. Fuera de la época reproductiva puede formar pequeñas bandadas familiares.'
      },
      distribution: {
        presence: 'Residente común en todo el territorio uruguayo, desde áreas urbanas hasta zonas rurales.',
        preferredHabitats: 'Se adapta a diversos hábitats: parques urbanos, campos abiertos, bordes de bosques y áreas rurales con árboles dispersos.',
        conservation: 'Estado de conservación favorable. Es una especie abundante y bien adaptada a ambientes modificados por el hombre.'
      },
      sounds: {
        song: 'Canto melodioso y repetitivo, compuesto por notas ascendentes y descendentes. El macho canta desde perchas elevadas para defender territorio.',
        calls: 'Llamadas de contacto cortas y agudas, y un llamado de alarma más fuerte cuando detecta depredadores.',
        season: 'Más vocal durante la primavera y verano, especialmente al amanecer y atardecer.'
      },
      seasonalPatterns: {
        spring: 'Inicio de la época reproductiva, construcción de nidos, mayor actividad vocal y territorial.',
        summer: 'Cría activa, alimentación de pichones, menor actividad vocal pero mayor presencia.',
        autumn: 'Finalización de la reproducción, formación de bandadas familiares, preparación para el invierno.',
        winter: 'Menor actividad vocal, concentración en áreas con recursos alimentarios, comportamiento más gregario.'
      }
    }
  },
  {
    id: 'southern-house-wren',
    commonName: 'Ratonera',
    scientificName: 'Troglodytes musculus',
    family: 'Troglodytidae',
    order: 'Passeriformes',
    habitat: ['urbana', 'rural', 'bosque'],
    status: 'residente',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/613154785/embed'
  },
  {
    id: 'chalk-browed-mockingbird',
    commonName: 'Calandria',
    scientificName: 'Mimus saturninus',
    family: 'Mimidae',
    order: 'Passeriformes',
    habitat: ['urbana', 'rural', 'pradera'],
    status: 'residente',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497654/embed'
  },
  {
    id: 'great-kiskadee',
    commonName: 'Benteveo',
    scientificName: 'Pitangus sulphuratus',
    family: 'Tyrannidae',
    order: 'Passeriformes',
    habitat: ['urbana', 'rural', 'bosque', 'humedal'],
    status: 'residente',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497636/embed'
  },
  {
    id: 'house-sparrow',
    commonName: 'Gorrión',
    scientificName: 'Passer domesticus',
    family: 'Passeridae',
    order: 'Passeriformes',
    habitat: ['urbana', 'rural'],
    status: 'residente',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/191279631/embed'
  },
  {
    id: 'european-starling',
    commonName: 'Estornino pinto',
    scientificName: 'Sturnus vulgaris',
    family: 'Sturnidae',
    order: 'Passeriformes',
    habitat: ['urbana', 'rural'],
    status: 'residente',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/158542881/embed'
  },

  // Anseriformes - Waterfowl
  {
    id: 'black-necked-swan',
    commonName: 'Cisne cuello negro',
    scientificName: 'Cygnus melancoryphus',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['humedal', 'costa'],
    status: 'residente',
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/548065331/embed'
  },
  {
    id: 'coscoroba-swan',
    commonName: 'Coscoroba',
    scientificName: 'Coscoroba coscoroba',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['humedal', 'costa'],
    status: 'residente',
    commonness: 'rara',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/259009971/embed'
  },
  {
    id: 'brazilian-teal',
    commonName: 'Pato barcino',
    scientificName: 'Amazonetta brasiliensis',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['humedal', 'costa'],
    status: 'residente',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/620010230/embed'
  },

  // Ciconiiformes - Storks and Herons
  {
    id: 'cocoi-heron',
    commonName: 'Garza mora',
    scientificName: 'Ardea cocoi',
    family: 'Ardeidae',
    order: 'Ciconiiformes',
    habitat: ['humedal', 'costa'],
    status: 'residente',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/469277011/embed'
  },

  // Accipitriformes - Birds of Prey

  {
    id: 'roadside-hawk',
    commonName: 'Gavilán común',
    scientificName: 'Rupornis magnirostris',
    family: 'Accipitridae',
    order: 'Accipitriformes',
    habitat: ['urbana', 'rural', 'bosque'],
    status: 'residente',
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

  // Charadriiformes - Shorebirds
  {
    id: 'southern-lapwing',
    commonName: 'Tero',
    scientificName: 'Vanellus chilensis',
    family: 'Charadriidae',
    order: 'Charadriiformes',
    habitat: ['pradera', 'rural', 'urbana'],
    status: 'residente',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/442325471/embed'
  },

  // Columbiformes - Pigeons and Doves
  {
    id: 'spot-winged-pigeon',
    commonName: 'Paloma ala manchada',
    scientificName: 'Patagioenas maculosa',
    family: 'Columbidae',
    order: 'Columbiformes',
    habitat: ['bosque', 'rural'],
    status: 'residente',
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617404122/embed'
  },
  {
    id: 'eared-dove',
    commonName: 'Torcaza',
    scientificName: 'Zenaida auriculata',
    family: 'Columbidae',
    order: 'Columbiformes',
    habitat: ['urbana', 'rural', 'pradera'],
    status: 'residente',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617987187/embed'
  },

  // Psittaciformes - Parrots
  {
    id: 'monk-parakeet',
    commonName: 'Cotorra',
    scientificName: 'Myiopsitta monachus',
    family: 'Psittacidae',
    order: 'Psittaciformes',
    habitat: ['urbana', 'rural', 'bosque'],
    status: 'residente',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497548/embed'
  },

  // Piciformes - Woodpeckers
  {
    id: 'campo-flicker',
    commonName: 'Carpintero campestre',
    scientificName: 'Colaptes campestris',
    family: 'Picidae',
    order: 'Piciformes',
    habitat: ['pradera', 'rural'],
    status: 'residente',
    commonness: 'común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/627431204/embed'
  },

  // Coraciiformes - Kingfishers
  {
    id: 'ringed-kingfisher',
    commonName: 'Martín pescador grande',
    scientificName: 'Megaceryle torquata',
    family: 'Alcedinidae',
    order: 'Coraciiformes',
    habitat: ['humedal', 'costa'],
    status: 'residente',
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