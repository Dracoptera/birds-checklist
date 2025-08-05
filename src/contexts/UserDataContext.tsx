import React, { createContext, useContext, useReducer, useEffect } from 'react';
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
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userDataReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('uruguayBirdingData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', data: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('uruguayBirdingData', JSON.stringify(state));
  }, [state]);

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

  const value: UserDataContextType = {
    state,
    dispatch,
    toggleSeen,
    togglePhoto,
    addObservation,
    removeObservation,
    resetData,
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