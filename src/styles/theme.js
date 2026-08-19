// src/styles/theme.js

// 🎨 Paleta de Colores Centralizada
export const colors = {
  // Primarios y secundarios
  primary: '#1976d2',
  primaryDark: '#0288d1',
  secondary: '#2e7d32',
  secondaryLight: '#81c784',
  
  // Estados y Ofertas
  danger: '#e53935',
  dangerLight: '#e57373',
  whatsapp: '#25D366',
  
  // Neutros y Fondos
  background: '#f5f5f5',
  surface: '#ffffff',
  surfaceAlt: '#f4f8fc',
  surfaceFilter: '#e0e0e0',
  
  // Bordes y Divisores
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  borderAlt: '#fafafa',
  borderOffer: '#d0e3f5',
  
  // Textos
  textPrimary: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  textLight: '#ffffff',
  textDarkAlt: '#444444',
  textFilter: '#555555',
  textSubtle: '#777777',
  
  // Badges
  badgeBackground: '#e8f5e9',
};

// 📏 Escala de Espaciados
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 15,
  xl: 16,
  xxl: 20,
};

// 🔤 Tipografía Global
export const typography = {
  fontSize: {
    badge: 11,
    caption: 12,
    small: 13,
    body: 14,
    subheading: 15,
    title: 16,
    kpi: 18,
    header: 20,
  },
  fontWeight: {
    regular: '400',
    medium: '600',
    bold: '700',
  },
  letterSpacing: {
    tight: 0.3,
    wide: 0.5,
  },
};

// 📐 Esquinas Redondeadas (Border Radius)
export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  pill: 20,
};

// ☀️ Sombras Predeterminadas
export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topBar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
};