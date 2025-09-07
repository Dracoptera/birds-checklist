import { Bird } from "./types";
import { accipitriformes } from "./orders/accipitriformes";
import { anseriformes } from "./orders/anseriformes";
import { charadriiformes } from "./orders/charadriiformes";
import { ciconiiformes } from "./orders/ciconiiformes";
import { columbiformes } from "./orders/columbiformes";
import { coraciiformes } from "./orders/coraciiformes";
import { galliformes } from "./orders/galliformes";
import { passeriformes } from "./orders/passeriformes";
import { pelecaniformes } from "./orders/pelecaniformes";
import { phoenicopteriformes } from "./orders/phoenicopteriformes";
import { piciformes } from "./orders/piciformes";
import { podicipediformes } from "./orders/podicipediformes";
import { procellariiformes } from "./orders/procellariiformes";
import { psittaciformes } from "./orders/psittaciformes";
import { rheiformes } from "./orders/rheiformes";
import { sphenisciformes } from "./orders/sphenisciformes";
import { tinamiformes } from "./orders/tinamiformes";

// All order files are properly imported and available

// Combine all birds from different orders
export const uruguayBirds: Bird[] = [
  ...accipitriformes,
  ...anseriformes,
  ...charadriiformes,
  ...ciconiiformes,
  ...columbiformes,
  ...coraciiformes,
  ...galliformes,
  ...passeriformes,
  ...pelecaniformes,
  ...phoenicopteriformes,
  ...piciformes,
  ...podicipediformes,
  ...procellariiformes,
  ...psittaciformes,
  ...rheiformes,
  ...sphenisciformes,
  ...tinamiformes,
];
