import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, LocationData, Room, NavigationRoute } from '../types';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  detectedLocation: LocationData | null;
  setDetectedLocation: (loc: LocationData | null) => void;
  selectedDestination: Room | null;
  setSelectedDestination: (room: Room | null) => void;
  currentRoute: NavigationRoute | null;
  setCurrentRoute: (route: NavigationRoute | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [detectedLocation, setDetectedLocation] = useState<LocationData | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Room | null>(null);
  const [currentRoute, setCurrentRoute] = useState<NavigationRoute | null>(null);

  // Handle Theme Changes
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        detectedLocation,
        setDetectedLocation,
        selectedDestination,
        setSelectedDestination,
        currentRoute,
        setCurrentRoute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};