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
  status: 'resident' | 'migratory' | 'visitor' | 'rare';
  departamentos?: string[];
  imageUrl?: string;
  ebirdEmbedUrl?: string;
  variations?: BirdVariation[];
}

export const uruguayBirds: Bird[] = [
  // Passeriformes - Passerines
  {
    id: 'rufous-hornero',
    commonName: 'Hornero',
    scientificName: 'Furnarius rufus',
    family: 'Furnariidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'grassland'],
    status: 'resident',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/79992301/embed',
    variations: [
      {
        id: 'adult',
        name: 'Adulto',
        description: 'Plumaje completo del adulto',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/79992301/embed',
        characteristics: ['Plumaje rufo uniforme', 'Pico negro', 'Patas grises']
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        description: 'Plumaje juvenil más pálido',
        ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/422648911/embed',
        characteristics: ['Plumaje más pálido', 'Pico más claro', 'Menos contraste']
      }
    ]
  },
  {
    id: 'southern-house-wren',
    commonName: 'Ratonera',
    scientificName: 'Troglodytes musculus',
    family: 'Troglodytidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'forest'],
    status: 'resident',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/422648911/embed'
  },
  {
    id: 'chalk-browed-mockingbird',
    commonName: 'Calandria',
    scientificName: 'Mimus saturninus',
    family: 'Mimidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'grassland'],
    status: 'resident',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/86257841/embed'
  },
  {
    id: 'great-kiskadee',
    commonName: 'Benteveo',
    scientificName: 'Pitangus sulphuratus',
    family: 'Tyrannidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'forest', 'wetland'],
    status: 'resident',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/79992301/embed'
  },
  {
    id: 'eastern-meadowlark',
    commonName: 'Loica',
    scientificName: 'Sturnella magna',
    family: 'Icteridae',
    order: 'Passeriformes',
    habitat: ['grassland', 'rural'],
    status: 'resident',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop'
  },
  {
    id: 'saffron-finch',
    commonName: 'Chingolo azafrán',
    scientificName: 'Sicalis flaveola',
    family: 'Thraupidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'grassland'],
    status: 'resident',
    departamentos: ['Montevideo', 'Canelones', 'San José', 'Colonia', 'Soriano', 'Río Negro', 'Paysandú', 'Salto', 'Artigas', 'Rivera', 'Tacuarembó', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo'],
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
    variations: [
      {
        id: 'male',
        name: 'Macho',
        description: 'Macho con plumaje amarillo brillante',
        imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
        characteristics: ['Cabeza y pecho amarillo brillante', 'Dorso oliváceo', 'Pico cónico']
      },
      {
        id: 'female',
        name: 'Hembra',
        description: 'Hembra con plumaje más apagado',
        imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
        characteristics: ['Plumaje más apagado', 'Menos amarillo', 'Rayas en el dorso']
      },
      {
        id: 'juvenile',
        name: 'Juvenil',
        description: 'Plumaje juvenil indistinto',
        imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
        characteristics: ['Plumaje pardo', 'Rayas en el pecho', 'Pico más claro']
      }
    ]
  },
  {
    id: 'house-sparrow',
    commonName: 'Gorrión',
    scientificName: 'Passer domesticus',
    family: 'Passeridae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural'],
    status: 'resident',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop'
  },
  {
    id: 'european-starling',
    commonName: 'Estornino pinto',
    scientificName: 'Sturnus vulgaris',
    family: 'Sturnidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural'],
    status: 'resident',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop'
  },

  // Anseriformes - Waterfowl
  {
    id: 'black-necked-swan',
    commonName: 'Cisne de cuello negro',
    scientificName: 'Cygnus melancoryphus',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/79992301/embed'
  },
  {
    id: 'coscoroba-swan',
    commonName: 'Coscoroba',
    scientificName: 'Coscoroba coscoroba',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
  },
  {
    id: 'white-faced-whistling-duck',
    commonName: 'Pato silbón cara blanca',
    scientificName: 'Dendrocygna viduata',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
  },
  {
    id: 'brazilian-teal',
    commonName: 'Pato barcino',
    scientificName: 'Amazonetta brasiliensis',
    family: 'Anatidae',
    order: 'Anseriformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
  },

  // Ciconiiformes - Storks and Herons
  {
    id: 'wood-stork',
    commonName: 'Tuyuyú',
    scientificName: 'Mycteria americana',
    family: 'Ciconiidae',
    order: 'Ciconiiformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
  },
  {
    id: 'cocoi-heron',
    commonName: 'Garza mora',
    scientificName: 'Ardea cocoi',
    family: 'Ardeidae',
    order: 'Ciconiiformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
  },

  // Accipitriformes - Birds of Prey
  {
    id: 'turkey-vulture',
    commonName: 'Jote cabeza negra',
    scientificName: 'Cathartes aura',
    family: 'Cathartidae',
    order: 'Accipitriformes',
    habitat: ['rural', 'grassland', 'forest'],
    status: 'resident'
  },

  {
    id: 'roadside-hawk',
    commonName: 'Gavilán caminero',
    scientificName: 'Rupornis magnirostris',
    family: 'Accipitridae',
    order: 'Accipitriformes',
    habitat: ['urban', 'rural', 'forest'],
    status: 'resident'
  },

  // Charadriiformes - Shorebirds
  {
    id: 'southern-lapwing',
    commonName: 'Tero',
    scientificName: 'Vanellus chilensis',
    family: 'Charadriidae',
    order: 'Charadriiformes',
    habitat: ['grassland', 'rural', 'urban'],
    status: 'resident',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop'
  },

  // Columbiformes - Pigeons and Doves
  {
    id: 'picazuro-pigeon',
    commonName: 'Paloma picazuró',
    scientificName: 'Patagioenas picazuro',
    family: 'Columbidae',
    order: 'Columbiformes',
    habitat: ['urban', 'rural', 'forest'],
    status: 'resident'
  },
  {
    id: 'spot-winged-pigeon',
    commonName: 'Paloma ala manchada',
    scientificName: 'Patagioenas maculosa',
    family: 'Columbidae',
    order: 'Columbiformes',
    habitat: ['forest', 'rural'],
    status: 'resident'
  },
  {
    id: 'eared-dove',
    commonName: 'Torcaza',
    scientificName: 'Zenaida auriculata',
    family: 'Columbidae',
    order: 'Columbiformes',
    habitat: ['urban', 'rural', 'grassland'],
    status: 'resident'
  },

  // Psittaciformes - Parrots
  {
    id: 'monk-parakeet',
    commonName: 'Cotorra',
    scientificName: 'Myiopsitta monachus',
    family: 'Psittacidae',
    order: 'Psittaciformes',
    habitat: ['urban', 'rural', 'forest'],
    status: 'resident'
  },
  {
    id: 'turquoise-fronted-parrot',
    commonName: 'Loro hablador',
    scientificName: 'Amazona aestiva',
    family: 'Psittacidae',
    order: 'Psittaciformes',
    habitat: ['forest', 'rural'],
    status: 'resident'
  },

  // Piciformes - Woodpeckers
  {
    id: 'campo-flicker',
    commonName: 'Carpintero campestre',
    scientificName: 'Colaptes campestris',
    family: 'Picidae',
    order: 'Piciformes',
    habitat: ['grassland', 'rural'],
    status: 'resident'
  },

  // Coraciiformes - Kingfishers
  {
    id: 'ringed-kingfisher',
    commonName: 'Martín pescador grande',
    scientificName: 'Megaceryle torquata',
    family: 'Alcedinidae',
    order: 'Coraciiformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
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