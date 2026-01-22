import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1ABC9C',
    secondary: '#3498DB',
    background: '#FFFFFF',
    card: '#F5F7FA',
    text: '#1F2A44',
    border: '#E8EEF7',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    muted: '#7A8A9A',
    overlay: "rgba(0,0,0,0.5)",
    inputBg: "#f9f9f9",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#1ABC9C',
    secondary: '#3498DB',
    background: '#0B0F19',
    card: '#111827',
    text: '#E5E7EB',   // <-- fix text color
    border: '#2B3446',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    muted: '#9CA3AF',
    overlay: "rgba(0,0,0,0.8)",
    inputBg: "#2A2A2A",
  },
};
