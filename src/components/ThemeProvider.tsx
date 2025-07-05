
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const defaultContextState: ThemeContextState = {
  theme: 'system',
  setTheme: () => {},
};
const ThemeProviderContext = createContext<ThemeContextState>(defaultContextState);

const THEME_CHANGE_REQUEST_EVENT = 'theme-change-request';
const THEME_ACTUALLY_CHANGED_EVENT = 'theme-actually-changed';

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'astro-ui-theme' }: ThemeProviderProps) {

  const [themePreference, setThemePreference] = useState<Theme>(() => {
    if (typeof localStorage !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    let actualThemeToApply: 'light' | 'dark';

    if (themePreference === 'system') {
      actualThemeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      actualThemeToApply = themePreference;
    }

    root.classList.remove('light', 'dark');
    root.classList.add(actualThemeToApply);
    localStorage.setItem(storageKey, themePreference);
    
    document.dispatchEvent(new CustomEvent(THEME_ACTUALLY_CHANGED_EVENT, { detail: { actualTheme: actualThemeToApply, preference: themePreference } }));

  }, [themePreference, storageKey]);

  useEffect(() => {
    const handleThemeChangeRequest = (event: Event) => {
      const newPreference = (event as CustomEvent).detail.theme as Theme;
      setThemePreference(newPreference);
    };
    document.addEventListener(THEME_CHANGE_REQUEST_EVENT, handleThemeChangeRequest);
    return () => {
      document.removeEventListener(THEME_CHANGE_REQUEST_EVENT, handleThemeChangeRequest);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (themePreference === 'system') {
        setThemePreference('system'); 
      }
    };
    if (themePreference === 'system') {
      mediaQuery.addEventListener('change', handleSystemChange);
    }
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themePreference]);

  const contextValue = {
    theme: themePreference,
    setTheme: setThemePreference,
  };

  return (
    <ThemeProviderContext.Provider value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
      return defaultContextState; 
  }
  return context;
};
