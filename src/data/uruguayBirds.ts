export interface Bird {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  order: string;
  habitat: string[];
  status: 'resident' | 'migratory' | 'visitor' | 'rare';
  imageUrl?: string;
  ebirdEmbedUrl?: string;
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
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/79992301/embed'
  },
  {
    id: 'southern-house-wren',
    commonName: 'Ratona común',
    scientificName: 'Troglodytes aedon',
    family: 'Troglodytidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'forest'],
    status: 'resident',
    ebirdEmbedUrl: 'https://macaulaylibrary.org/asset/79992301/embed'
  },
  {
    id: 'chalk-browed-mockingbird',
    commonName: 'Calandria',
    scientificName: 'Mimus saturninus',
    family: 'Mimidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'grassland'],
    status: 'resident',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop'
  },
  {
    id: 'great-kiskadee',
    commonName: 'Benteveo',
    scientificName: 'Pitangus sulphuratus',
    family: 'Tyrannidae',
    order: 'Passeriformes',
    habitat: ['urban', 'rural', 'forest', 'wetland'],
    status: 'resident',
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
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop'
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
  {
    id: 'great-egret',
    commonName: 'Garceta grande',
    scientificName: 'Ardea alba',
    family: 'Ardeidae',
    order: 'Ciconiiformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
  },
  {
    id: 'snowy-egret',
    commonName: 'Garceta nívea',
    scientificName: 'Egretta thula',
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
    id: 'black-vulture',
    commonName: 'Jote cabeza roja',
    scientificName: 'Coragyps atratus',
    family: 'Cathartidae',
    order: 'Accipitriformes',
    habitat: ['rural', 'grassland', 'forest'],
    status: 'resident'
  },
  {
    id: 'savanna-hawk',
    commonName: 'Gavilán colorado',
    scientificName: 'Buteogallus meridionalis',
    family: 'Accipitridae',
    order: 'Accipitriformes',
    habitat: ['grassland', 'rural'],
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
  {
    id: 'kelp-gull',
    commonName: 'Gaviota cocinera',
    scientificName: 'Larus dominicanus',
    family: 'Laridae',
    order: 'Charadriiformes',
    habitat: ['coastal', 'urban'],
    status: 'resident'
  },
  {
    id: 'brown-hooded-gull',
    commonName: 'Gaviota capucho café',
    scientificName: 'Chroicocephalus maculipennis',
    family: 'Laridae',
    order: 'Charadriiformes',
    habitat: ['coastal', 'wetland'],
    status: 'resident'
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
    id: 'white-fronted-woodpecker',
    commonName: 'Carpintero de frente blanca',
    scientificName: 'Melanerpes cactorum',
    family: 'Picidae',
    order: 'Piciformes',
    habitat: ['forest', 'rural'],
    status: 'resident'
  },
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
  {
    id: 'amazon-kingfisher',
    commonName: 'Martín pescador mediano',
    scientificName: 'Chloroceryle amazona',
    family: 'Alcedinidae',
    order: 'Coraciiformes',
    habitat: ['wetland', 'coastal'],
    status: 'resident'
  }
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