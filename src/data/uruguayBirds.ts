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
  status: 'residente' | 'migratoria invernal' | 'migratoria estival' | 'visitante';
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
  // Passeriformes - Passerines
  {
    id: 'hornero',
    commonName: 'Hornero',
    englishName: 'Rufous Hornero',
    scientificName: 'Furnarius rufus',
    family: 'Furnariidae',
    order: 'Passeriformes',
    habitat: ['ciudad', 'monte', 'pradera'],
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
        presence: 'Residente común en todo el territorio uruguayo, desde áreas ciudads hasta zonas sierrases.',
        preferredHabitats: 'Se adapta a diversos hábitats: parques urbanos, campos abiertos, bordes de montes y áreas sierrases con árboles dispersos.',
        conservation: 'Estado de conservación favorable. Es una especie abundante y bien adaptada a ambientes modificados por el hombre.'
      },
      curiosities: 'El Hornero es el ave nacional de Argentina y símbolo de la construcción y el trabajo. Su nido de barro puede tardar hasta 18 días en construirse y es tan resistente que puede durar varios años. Curiosamente, cada año construyen un nido nuevo, ya que nunca reutilizan el anterior. Su canto melodioso es considerado un presagio de buen tiempo por los pobladores rurales.',
      seasonalPatterns: {
        spring: 'Inicio de la época reproductiva, construcción de nidos, mayor actividad vocal y territorial.',
        summer: 'Cría activa, alimentación de pichones, menor actividad vocal pero mayor presencia.',
        autumn: 'Finalización de la reproducción, formación de bandadas familiares, preparación para el invierno.',
        winter: 'Menor actividad vocal, concentración en áreas con recursos alimentarios, comportamiento más gregario.'
      }
    }
  },
  {
    id: 'ratonera',
    commonName: 'Ratonera',
    englishName: 'Southern House Wren',
    scientificName: 'Troglodytes musculus',
    family: 'Troglodytidae',
    order: 'Passeriformes',
    habitat: ['ciudad', 'pradera', 'monte'],
    status: 'residente',
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
    order: 'Passeriformes',
    habitat: ['ciudad', 'sierras', 'pradera'],
    status: 'residente',
    commonness: 'abundante',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497654/embed',
    description: {
      general: 'La Calandria es un ave muy común en Uruguay, conocida por su habilidad para imitar el canto de otras aves. Su plumaje es principalmente gris y blanco, con un pico largo y negro.',
      behavior: {
        feeding: 'Omnívora, consume insectos, semillas, frutas y ocasionalmente pichones y huevos de otras aves.',
        reproduction: 'Monógama. Pone 3 a 4 huevos.',
        social: 'Generalmente en parejas territoriales durante la reproducción. Fuera de la época reproductiva puede formar pequeñas bandadas familiares.'
      },
      distribution: {
        presence: 'Residente común en todo el territorio uruguayo, desde áreas ciudads hasta zonas sierrases.',
        preferredHabitats: 'Se adapta a diversos hábitats: parques urbanos, campos abiertos, bordes de montes y áreas sierrases con árboles dispersos.',
        conservation: 'Estado de conservación favorable. Es una especie abundante y bien adaptada a ambientes modificados por el hombre.'
      },
      curiosities: 'Es comúnmente parastada por el Tordo Común.',
      seasonalPatterns: {
        spring: 'Inicio de la época reproductiva. Nidificación.',
        summer: 'Nidificación.',
        autumn: 'Finalización de la reproducción, formación de bandadas familiares, preparación para el invierno.',
        winter: 'Menor actividad vocal, concentración en áreas con recursos alimentarios, comportamiento más gregario.'
      }
    }
  },
  {
    id: 'benteveo',
    commonName: 'Benteveo',
    englishName: 'Great Kiskadee',
    scientificName: 'Pitangus sulphuratus',
    family: 'Tyrannidae',
    order: 'Passeriformes',
    habitat: ['ciudad', 'sierras', 'monte', 'bañado'],
    status: 'residente',
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
    order: 'Passeriformes',
    habitat: ['ciudad', 'sierras'],
    status: 'residente',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/191279631/embed'
  },
  {
    id: 'estornino-pinto',
    commonName: 'Estornino pinto',
    englishName: 'European Starling',
    scientificName: 'Sturnus vulgaris',
    family: 'Sturnidae',
    order: 'Passeriformes',
    habitat: ['ciudad', 'sierras'],
    status: 'residente',
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
    order: 'Anseriformes',
    habitat: ['bañado', 'costa'],
    status: 'residente',
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/548065331/embed'
  },
  {
    id: 'coscoroba',
    commonName: 'Coscoroba',
    englishName: 'Coscoroba Swan',
    scientificName: 'Coscoroba coscoroba',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['bañado', 'costa'],
    status: 'residente',
    commonness: 'rara',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/259009971/embed'
  },
  {
    id: 'pato-barcino',
    commonName: 'Pato barcino',
    englishName: 'Brazilian Teal',
    scientificName: 'Amazonetta brasiliensis',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['bañado', 'costa'],
    status: 'residente',
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
    order: 'Ciconiiformes',
    habitat: ['bañado', 'costa'],
    status: 'residente',
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
    order: 'Accipitriformes',
    habitat: ['ciudad', 'sierras', 'monte'],
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
    id: 'tero',
    commonName: 'Tero',
    englishName: 'Southern Lapwing',
    scientificName: 'Vanellus chilensis',
    family: 'Charadriidae',
    order: 'Charadriiformes',
    habitat: ['pradera', 'sierras', 'ciudad'],
    status: 'residente',
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
    order: 'Columbiformes',
    habitat: ['monte', 'sierras'],
    status: 'residente',
    commonness: 'poco común',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617404122/embed'
  },
  {
    id: 'torcaza',
    commonName: 'Torcaza',
    englishName: 'Eared Dove',
    scientificName: 'Zenaida auriculata',
    family: 'Columbidae',
    order: 'Columbiformes',
    habitat: ['ciudad', 'sierras', 'pradera'],
    status: 'residente',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/617987187/embed'
  },

  // Psittaciformes - Parrots
  {
    id: 'cotorra-monja',
    commonName: 'Cotorra monja',
    englishName: 'Monk Parakeet',
    scientificName: 'Myiopsitta monachus',
    family: 'Psittacidae',
    order: 'Psittaciformes',
    habitat: ['ciudad', 'sierras', 'monte'],
    status: 'residente',
    commonness: 'abundante',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/638497548/embed'
  },

  // Piciformes - Woodpeckers
  {
    id: 'carpintero-campestre',
    commonName: 'Carpintero campestre',
    englishName: 'Campo Flicker',
    scientificName: 'Colaptes campestris',
    family: 'Picidae',
    order: 'Piciformes',
    habitat: ['pradera', 'sierras'],
    status: 'residente',
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
    order: 'Coraciiformes',
    habitat: ['bañado', 'costa'],
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