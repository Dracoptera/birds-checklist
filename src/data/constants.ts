// Shared constants across all order files
export const BIRD_STATUS = {
    OCASIONAL: '🌍 visitante ocasional',
    INVERNAL: '❄️ visitante invernal',
    ESTIVAL: '🌞 visitante estival',
    RESIDENTE: '🏠 residente'
  } as const;
  
  export const CONSERVATION_STATUS = {
    PREOCUPACION_MENOR: 'Preocupación menor',
    CASI_AMENAZADA: 'Casi amenazada',
    VULNERABLE: 'Vulnerable',
    EN_PELIGRO: 'En peligro',
    PELIGRO_CRITICO: 'Peligro crítico'
  } as const;
  
  export const ORIGIN = {
    AUTOCTONA: 'autóctona',
    INTRODUCIDA: 'introducida'
  } as const;
  
  export const COMMONNESS = {
    ABUNDANTE: 'abundante',
    COMUN: 'común',
    POCO_COMUN: 'poco común',
    RARA: 'rara',
    MUY_RARA: 'muy rara'
  } as const;
  