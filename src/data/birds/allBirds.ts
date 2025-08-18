import { Bird } from "./types";
import { passeriformes } from "./orders/passeriformes";
import { anseriformes } from "./orders/anseriformes";
import { pelecaniformes } from "./orders/pelecaniformes";
import { accipitriformes } from "./orders/accipitriformes";
import { charadriiformes } from "./orders/charadriiformes";
import { columbiformes } from "./orders/columbiformes";
import { psittaciformes } from "./orders/psittaciformes";
import { piciformes } from "./orders/piciformes";
import { coraciiformes } from "./orders/coraciiformes";
import { rheiformes } from "./orders/rheiformes";
import { tinamiformes } from "./orders/tinamiformes";
import { galliformes } from "./orders/galliformes";
import { podicipediformes } from "./orders/podicipediformes";
import { phoenicopteriformes } from "./orders/phoenicopteriformes";
import { sphenisciformes } from "./orders/sphenisciformes";
import { procellariiformes } from "./orders/procellariiformes";

// All order files are properly imported and available

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
  ...rheiformes,
  ...tinamiformes,
  ...galliformes,
  ...podicipediformes,
  ...phoenicopteriformes,
  ...sphenisciformes,
  ...procellariiformes,
];
