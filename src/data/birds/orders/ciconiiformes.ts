import {
  BIRD_STATUS,
  COMMONNESS,
  CONSERVATION_STATUS,
  ORIGIN,
} from "../../constants";
import { Bird } from "../types";

const ORDER_NAME = "Ciconiiformes (Cigüeñas)";

export const ciconiiformes: Bird[] = [
  {
    id: "cigueña-comun",
    commonName: "Cigueña Común",
    englishName: "Maguari Stork",
    scientificName: "Ciconia maguari",
    size: "85 cm",
    family: "Ciconiidae",
    order: ORDER_NAME,
    habitat: ["bañado 💧"],
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
    ebirdEmbedUrl: "https://macaulaylibrary.org/asset/616817311/embed",
    cardHeight: { xs: 680, lg: 780, xl: 780 },
  },
];
