import { Bird } from './types';
import { passeriformes } from './orders/passeriformes';
import { anseriformes } from './orders/anseriformes';
import { pelecaniformes } from './orders/pelecaniformes';
import { accipitriformes } from './orders/accipitriformes';
import { charadriiformes } from './orders/charadriiformes';
import { columbiformes } from './orders/columbiformes';
import { psittaciformes } from './orders/psittaciformes';
import { piciformes } from './orders/piciformes';
import { coraciiformes } from './orders/coraciiformes';

// Combine all birds from different orders
export const uruguayBirds: Bird[] = [
  ...passeriformes,
  ...anseriformes,
  ...pelecaniformes,
  ...accipitriformes,
  ...charadriiformes,
  ...columbiformes,
  ...psittaciformes,
  ...piciformes,
  ...coraciiformes,
];
