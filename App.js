import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Contextos Globales
import { CarritoProvider } from './src/context/CarritoContext';
import { AdminProvider } from './src/context/AdminContext';

// Módulo de Navegación centralizado
import AppNavigation from './src/navigation';

/**
 * App
 * Punto de entrada principal de la aplicación.
 * Provee el contexto global e invoca la navegación modularizada.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <AdminProvider>
        <CarritoProvider>
          <AppNavigation />
        </CarritoProvider>
      </AdminProvider>
    </SafeAreaProvider>
  );
}