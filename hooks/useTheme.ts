import { useState, useEffect, createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    card: string;
    tabBar: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const lightColors = {
  background: '#ffffff',
  surface: '#f9fafb',
  text: '#000000',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  primary: '#10b981',
  card: '#ffffff',
  tabBar: '#ffffff',
};

export const darkColors = {
  background: '#111827',
  surface: '#1f2937',
  text: '#ffffff',
  textSecondary: '#9ca3af',
  border: '#374151',
  primary: '#10b981',
  card: '#1f2937',
  tabBar: '#1f2937',
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback for when used outside provider
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    return {
      isDarkMode,
      toggleTheme: () => setIsDarkMode(!isDarkMode),
      colors: isDarkMode ? darkColors : lightColors,
    };
  }
  return context;
}

export function useThemeProvider() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return {
    isDarkMode,
    toggleTheme,
    colors,
  };
}