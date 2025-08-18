import { Bird } from "../types";
import {
  BIRD_STATUS,
  COMMONNESS,
  CONSERVATION_STATUS,
  ORIGIN,
} from "../../constants";

const ORDER_NAME = "Piciformes (Carpinteros)";

export const piciformes: Bird[] = [
  {
    id: "carpintero-de-campo",
    commonName: "Carpintero de Campo",
    englishName: "Campo Flicker",
    scientificName: "Colaptes campestris",
    size: "27 cm",
    family: "Picidae",
    order: ORDER_NAME,
    habitat: ["pradera 🌿", "sierra 🏔️"],
    status: BIRD_STATUS.RESIDENTE,
    origin: ORIGIN.AUTOCTONA,
    commonness: COMMONNESS.COMUN,
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
    ebirdEmbedUrl: "https://macaulaylibrary.org/asset/627431204/embed",
  },
];
