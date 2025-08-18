import { Bird } from "../types";
import {
  BIRD_STATUS,
  COMMONNESS,
  CONSERVATION_STATUS,
  ORIGIN,
} from "../../constants";

const ORDER_NAME = "Psittaciformes (Loros)";

export const psittaciformes: Bird[] = [
  {
    id: "cotorra",
    commonName: "Cotorra",
    englishName: "Monk Parakeet",
    scientificName: "Myiopsitta monachus",
    size: "27 cm",
    family: "Psittacidae",
    order: ORDER_NAME,
    habitat: ["ciudad 🌆", "sierra 🏔️", "monte 🌲"],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.ABUNDANTE,
    conservationStatus: CONSERVATION_STATUS.PREOCUPACION_MENOR,
    departamentos: [
      "Montevideo",
      "Canelones",
      "San José",
      "Colonia",
      "Soriano",
      "Río Negro",
      "Paysandú",
      "Salto",
      "Artigas",
      "Rivera",
      "Tacuarembó",
      "Durazno",
      "Flores",
      "Florida",
      "Lavalleja",
      "Maldonado",
      "Rocha",
      "Treinta y Tres",
      "Cerro Largo",
    ],
    ebirdEmbedUrl: "https://macaulaylibrary.org/asset/638497548/embed",
    soundUrl: "https://macaulaylibrary.org/asset/195143221/embed",
  },
];
