import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Job, User, Language, SortOption } from '@/types';

interface AppContextType {
  state: AppState;
  acceptJob: (job: Job) => void;
  rejectJob: (job: Job) => void;
  updateUser: (user: User) => void;
  setLanguage: (language: Language) => void;
  setSortBy: (sortBy: SortOption) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'ACCEPT_JOB'; payload: Job }
  | { type: 'REJECT_JOB'; payload: Job }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_SORT_BY'; payload: SortOption };

const initialState: AppState = {
  jobs: [],
  acceptedJobs: [],
  rejectedJobs: [],
  currentLanguage: 'ja',
  sortBy: 'date',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ACCEPT_JOB':
      return {
        ...state,
        acceptedJobs: [...state.acceptedJobs, action.payload],
        jobs: state.jobs.filter(job => job.id !== action.payload.id),
      };
    case 'REJECT_JOB':
      return {
        ...state,
        rejectedJobs: [...state.rejectedJobs, action.payload],
        jobs: state.jobs.filter(job => job.id !== action.payload.id),
      };
    case 'UPDATE_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        currentLanguage: action.payload,
      };
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const acceptJob = (job: Job) => {
    dispatch({ type: 'ACCEPT_JOB', payload: job });
  };

  const rejectJob = (job: Job) => {
    dispatch({ type: 'REJECT_JOB', payload: job });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const setLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const setSortBy = (sortBy: SortOption) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  const value: AppContextType = {
    state,
    acceptJob,
    rejectJob,
    updateUser,
    setLanguage,
    setSortBy,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}