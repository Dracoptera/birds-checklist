import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { uruguayBirds } from '../data/uruguayBirds';
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
          hasPhoto: existingObservation?.hasPhoto || false,
          observations: existingObservation?.observations || [],
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
    // Only save after we've loaded data and if we have actual data
    if (hasLoadedData && (Object.keys(state.observations).length > 0 || state.totalSeen > 0 || state.totalWithPhotos > 0)) {
      console.log('Saving state to localStorage:', state);
      localStorage.setItem('uruguayBirdingData', JSON.stringify(state));
    } else if (!hasLoadedData) {
      console.log('Not saving yet - still loading data');
    } else {
      console.log('Not saving initial state to localStorage');
    }
  }, [state, hasLoadedData]);

  const toggleSeen = (birdId: string) => {
    dispatch({ type: 'TOGGLE_SEEN', birdId });
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
    const dataToExport = {
      ...state,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
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
    dispatch({ type: 'LOAD_DATA', data });
  };

  const value: UserDataContextType = {
    state,
    dispatch,
    toggleSeen,
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