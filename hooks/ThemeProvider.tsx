// hooks/ThemeProvider.tsx
import { createContext, ReactNode } from 'react';
import { useThemeProvider } from './useTheme';

type ThemeContextType = {
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
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useThemeProvider();

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
