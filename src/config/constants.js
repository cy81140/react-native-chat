export const colors = {
  primary: '#2563EB', // Updated to a more modern blue
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',
  secondary: '#F1F5F9',
  secondaryLight: '#FFFFFF',
  secondaryDark: '#E2E8F0',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  accent: '#8B5CF6',
  teal: '#0D9488',
  pink: '#FF69B4',
  grey: '#808080'
};

export const lightColors = {
  primary: '#1E88E5', // Blue for trust and reliability
  primaryLight: '#6AB7FF',
  primaryDark: '#005CB2',
  secondary: '#F5F5F5',
  secondaryLight: '#FFFFFF',
  secondaryDark: '#E0E0E0',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  error: '#D32F2F',
  success: '#2E7D32',
  warning: '#ED6C02',
  info: '#0288D1',
  accent: '#00BFA5',
};

export const darkColors = {
  primary: '#90CAF9', // Lighter blue for dark mode
  primaryLight: '#C3FDFF',
  primaryDark: '#5D99C6', 
  secondary: '#2D2D2D',
  secondaryLight: '#3D3D3D',
  secondaryDark: '#1D1D1D',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#404040',
  error: '#EF5350',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#29B6F6',
  accent: '#1DE9B6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const elevation = {
  none: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: 0,
    },
    web: {
      boxShadow: 'none',
    },
  },
  sm: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    android: {
      elevation: 1,
    },
    web: {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
  },
  md: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },
  lg: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
    },
    android: {
      elevation: 5,
    },
    web: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
};
