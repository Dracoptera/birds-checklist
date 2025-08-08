import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { uruguayBirds } from '../data/birds';
import { UserData, BirdObservation, ObservationDetail } from '../types';

interface UserDataState {
  observations: { [birdId: string]: BirdObservation };
  totalSeen: number;
  totalWithPhotos: number;
  lastUpdated: string;
}

type UserDataAction =
  | { type: 'TOGGLE_SEEN'; birdId: string }
  | { type: 'TOGGLE_PHOTO'; birdId: string }
  | { type: 'ADD_OBSERVATION'; birdId: string; observation: ObservationDetail }
  | { type: 'REMOVE_OBSERVATION'; birdId: string; observationId: string }
  | { type: 'LOAD_DATA'; data: UserData }
  | { type: 'RESET_DATA' };

const initialState: UserDataState = {
  observations: {},
  totalSeen: 0,
  totalWithPhotos: 0,
  lastUpdated: new Date().toISOString(),
};

function userDataReducer(state: UserDataState, action: UserDataAction): UserDataState {
  switch (action.type) {
    case 'TOGGLE_SEEN': {
      const bird = uruguayBirds.find(b => b.id === action.birdId);
      if (!bird) return state;

      const existingObservation = state.observations[action.birdId];
      const newSeen = !existingObservation?.seen;
      
      const newObservations = {
        ...state.observations,
        [action.birdId]: {
          birdId: action.birdId,
          bird,
          seen: newSeen,
          hasPhoto: newSeen ? (existingObservation?.hasPhoto || false) : false, // Reset photo status when marking as not seen
          observations: newSeen ? (existingObservation?.observations || []) : [], // Clear observations when marking as not seen
        },
      };

      const totalSeen = Object.values(newObservations).filter(obs => obs.seen).length;
      const totalWithPhotos = Object.values(newObservations).filter(obs => obs.hasPhoto).length;

      return {
        ...state,
        observations: newObservations,
        totalSeen,
        totalWithPhotos,
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'TOGGLE_PHOTO': {
      const existingObservation = state.observations[action.birdId];
      if (!existingObservation) return state;

      const newHasPhoto = !existingObservation.hasPhoto;
      
      const newObservations = {
        ...state.observations,
        [action.birdId]: {
          ...existingObservation,
          hasPhoto: newHasPhoto,
        },
      };

      const totalWithPhotos = Object.values(newObservations).filter(obs => obs.hasPhoto).length;

      return {
        ...state,
        observations: newObservations,
        totalWithPhotos,
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'ADD_OBSERVATION': {
      const existingObservation = state.observations[action.birdId];
      if (!existingObservation) return state;

      const newObservations = {
        ...state.observations,
        [action.birdId]: {
          ...existingObservation,
          observations: [...existingObservation.observations, action.observation],
        },
      };

      return {
        ...state,
        observations: newObservations,
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'REMOVE_OBSERVATION': {
      const existingObservation = state.observations[action.birdId];
      if (!existingObservation) return state;

      const newObservations = {
        ...state.observations,
        [action.birdId]: {
          ...existingObservation,
          observations: existingObservation.observations.filter(
            obs => obs.id !== action.observationId
          ),
        },
      };

      return {
        ...state,
        observations: newObservations,
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'LOAD_DATA':
      return action.data;

    case 'RESET_DATA':
      return initialState;

    default:
      return state;
  }
}

interface UserDataContextType {
  state: UserDataState;
  dispatch: React.Dispatch<UserDataAction>;
  toggleSeen: (birdId: string) => void;
  checkNeedsSeeingWarning: (birdId: string) => { needsWarning: boolean; birdName: string; observationCount: number } | null;
  togglePhoto: (birdId: string) => void;
  addObservation: (birdId: string, observation: Omit<ObservationDetail, 'id'>) => void;
  removeObservation: (birdId: string, observationId: string) => void;
  resetData: () => void;
  exportData: () => void;
  importData: (data: UserData) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userDataReducer, initialState);
  const [hasLoadedData, setHasLoadedData] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('uruguayBirdingData');
    console.log('Loading saved data:', savedData);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('Parsed data:', parsedData);
        dispatch({ type: 'LOAD_DATA', data: parsedData });
        setHasLoadedData(true);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    } else {
      console.log('No saved data found');
      setHasLoadedData(true);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    // Only save after we've loaded data
    if (hasLoadedData) {
      console.log('Saving state to localStorage:', state);
      localStorage.setItem('uruguayBirdingData', JSON.stringify(state));
    } else {
      console.log('Not saving yet - still loading data');
    }
  }, [state, hasLoadedData]);

  const toggleSeen = (birdId: string) => {
    dispatch({ type: 'TOGGLE_SEEN', birdId });
  };

  const checkNeedsSeeingWarning = (birdId: string) => {
    const existingObservation = state.observations[birdId];
    const hasObservations = existingObservation?.observations && existingObservation.observations.length > 0;
    const isCurrentlySeen = existingObservation?.seen;
    
    // If bird is currently seen and has observations, needs warning
    if (isCurrentlySeen && hasObservations) {
      const bird = uruguayBirds.find(b => b.id === birdId);
      const birdName = bird?.commonName || 'esta ave';
      const observationCount = existingObservation.observations.length;
      
      return {
        needsWarning: true,
        birdName,
        observationCount
      };
    }
    
    return null; // No warning needed
  };

  const togglePhoto = (birdId: string) => {
    dispatch({ type: 'TOGGLE_PHOTO', birdId });
  };

  const addObservation = (birdId: string, observation: Omit<ObservationDetail, 'id'>) => {
    const newObservation: ObservationDetail = {
      ...observation,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_OBSERVATION', birdId, observation: newObservation });
  };

  const removeObservation = (birdId: string, observationId: string) => {
    dispatch({ type: 'REMOVE_OBSERVATION', birdId, observationId });
  };

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' });
  };

  const exportData = () => {
    // Create a minimal export with only essential data
    const minimalData = {
      observations: Object.entries(state.observations).reduce((acc, [birdId, observation]) => {
        // Only include birds that have been seen or have photos
        if (observation.seen || observation.hasPhoto) {
          acc[birdId] = {
            seen: observation.seen,
            hasPhoto: observation.hasPhoto,
            observations: observation.observations, // Include detailed observations
          };
        }
        return acc;
      }, {} as { [birdId: string]: { seen: boolean; hasPhoto: boolean; observations: ObservationDetail[] } }),
      totalSeen: state.totalSeen,
      totalWithPhotos: state.totalWithPhotos,
      lastUpdated: state.lastUpdated,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    
    const dataStr = JSON.stringify(minimalData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `uruguay-birding-checklist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (data: UserData) => {
    // Handle both old format (with full bird objects) and new minimal format
    let processedData: UserData;
    
    if (data.observations && Object.keys(data.observations).length > 0) {
      const firstObservation = Object.values(data.observations)[0];
      
      // Check if this is the new minimal format (only has seen/hasPhoto properties)
      if (typeof firstObservation === 'object' && 'seen' in firstObservation && !('bird' in firstObservation)) {
        // Convert minimal format back to full format
        const fullObservations: { [birdId: string]: BirdObservation } = {};
        
        Object.entries(data.observations).forEach(([birdId, minimalObs]) => {
          const bird = uruguayBirds.find(b => b.id === birdId);
          if (bird) {
            fullObservations[birdId] = {
              birdId,
              bird,
              seen: (minimalObs as any).seen || false,
              hasPhoto: (minimalObs as any).hasPhoto || false,
              observations: (minimalObs as any).observations || [], // Preserve detailed observations
            };
          }
        });
        
        processedData = {
          ...data,
          observations: fullObservations,
        };
      } else {
        // Old format - use as is
        processedData = data;
      }
    } else {
      // Empty data or invalid format
      processedData = data;
    }
    
    dispatch({ type: 'LOAD_DATA', data: processedData });
    // Force save the imported data to localStorage immediately
    localStorage.setItem('uruguayBirdingData', JSON.stringify(processedData));
  };

  const value: UserDataContextType = {
    state,
    dispatch,
    toggleSeen,
    checkNeedsSeeingWarning,
    togglePhoto,
    addObservation,
    removeObservation,
    resetData,
    exportData,
    importData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
} 