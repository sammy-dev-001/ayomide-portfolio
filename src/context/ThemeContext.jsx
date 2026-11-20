import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  isAuto: true,
  toggleTheme: () => {},
  setAutoTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [isAuto, setIsAuto] = useState(() => {
    if (typeof window !== 'undefined') {
      const pref = localStorage.getItem('theme_preference');
      const overrideDate = localStorage.getItem('theme_override_date');
      const today = new Date().toDateString();
      return pref === 'auto' || !pref || overrideDate !== today;
    }
    return true;
  });

  const applyTheme = useCallback((newTheme) => {
    const root = document.documentElement;
    if (newTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme_preference', next);
      localStorage.setItem('theme_override_date', new Date().toDateString());
    } catch (e) {}
    setIsAuto(false);
    applyTheme(next);
  }, [theme, applyTheme]);

  const setAutoTheme = useCallback(() => {
    try {
      localStorage.setItem('theme_preference', 'auto');
      localStorage.removeItem('theme_override_date');
    } catch (e) {}
    setIsAuto(true);
    const hour = new Date().getHours();
    const computed = hour >= 6 && hour < 18 ? 'light' : 'dark';
    applyTheme(computed);
  }, [applyTheme]);

  // Hourly transition check when in auto mode
  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      const computed = hour >= 6 && hour < 18 ? 'light' : 'dark';
      if (computed !== theme) {
        applyTheme(computed);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [isAuto, theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isAuto, toggleTheme, setAutoTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
