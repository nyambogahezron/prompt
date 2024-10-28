import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GlobalContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  ThemeToggle: (theme: 'light' | 'dark') => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  theme: 'light',
  setTheme: () => {},
  ThemeToggle: () => {},
});

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>('light');
  const colorScheme = useColorScheme();
 

  //  theme provider
  const getUserTheme = async () => {
    try {
      const userTheme = await AsyncStorage.getItem('theme');
      if (userTheme !== null) {
        setTheme(userTheme);
      } else {
        setTheme(colorScheme || 'light');
      }
    } catch (error) {
      console.error(error);
    }
  };

 async function ThemeToggle(theme: 'light' | 'dark') {
    try {
      await AsyncStorage.setItem('theme', theme);
      setTheme(theme);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getUserTheme()
  }, [theme, colorScheme])
  return (
    <GlobalContext.Provider value={{ theme, setTheme, ThemeToggle }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
