import { Bird } from "../types";
import {
  BIRD_STATUS,
  COMMONNESS,
  CONSERVATION_STATUS,
  ORIGIN,
} from "../../constants";

const ORDER_NAME = "Pelecaniformes (Garzas, Cuervillos y Espátulas)";

export const pelecaniformes: Bird[] = [
  {
    id: "garza-mora",
    commonName: "Garza Mora",
    englishName: "Cocoi Heron",
    scientificName: "Ardea cocoi",
    size: "75 cm",
    family: "Ardeidae",
    order: ORDER_NAME,
    habitat: ["bañado 💧", "costa 🌊"],
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
    ebirdEmbedUrl: "https://macaulaylibrary.org/asset/469277011/embed",
    soundUrl: "https://macaulaylibrary.org/asset/225025/embed",
  },
];
