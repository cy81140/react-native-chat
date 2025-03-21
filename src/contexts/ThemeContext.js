import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '../config/constants';

// Create context with default value
export const ThemeContext = createContext({
  colors: lightColors,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceTheme === 'dark');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
      setIsDark(newTheme);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const theme = {
    colors: isDark ? darkColors : lightColors,
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider');
    return { colors: lightColors, isDark: false, toggleTheme: () => {} };
  }
  return context;
};
