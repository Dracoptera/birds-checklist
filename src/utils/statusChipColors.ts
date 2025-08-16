export const getStatusChipColors = (status: string) => {
  switch (status) {
    case '🌍 visitante ocasional':
      return {
        backgroundColor: undefined,
        color: undefined,
        chipColor: 'info' as const
      };
    case '❄️ visitante invernal':
      return {
        backgroundColor: '#255F85',
        color: 'white',
        chipColor: undefined
      };
    case '🌞 visitante estival':
      return {
        backgroundColor: '#FFDF00',
        color: 'black',
        chipColor: undefined
      };
    case '🏠 residente':
      return {
        backgroundColor: '#2E933C',
        color: 'white',
        chipColor: undefined
      };
    default:
      return {
        backgroundColor: undefined,
        color: undefined,
        chipColor: undefined
      };
  }
};

export const getPelagicChipProps = (bird: any) => {
  const isPelagic = bird.habitat && bird.habitat.some((hab: string) => hab.includes('mar 🌊'));
  
  if (isPelagic) {
    return {
      label: '🌊 pelágica',
      color: 'info' as const,
      icon: undefined
    };
  } else {
    return {
      label: bird.origin,
      color: (bird.origin === 'autóctona' ? 'success' : 'error') as 'success' | 'error',
      icon: bird.origin === 'autóctona' ? 'NatureIcon' : 'ImportContactsIcon'
    };
  }
};

export const getConservationStatusColor = (conservationStatus: string) => {
  switch (conservationStatus) {
    case 'Preocupación menor':
      return 'success';
    case 'Casi amenazada':
      return 'warning';
    case 'Vulnerable':
    case 'En peligro':
    case 'Peligro crítico':
      return 'error';
    default:
      return 'default';
  }
};
