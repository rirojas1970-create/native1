import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Importación de las pantallas correspondientes a cada pestaña
import CatalogoScreen from '../screens/CatalogoScreen';
import CleanOffersScreen from '../screens/CleanOffersScreen';
import HistorialScreen from '../screens/HistorialScreen';
import MiConsumoScreen from '../screens/MiConsumoScreen';

const Tab = createMaterialTopTabNavigator();

/**
 * ClientTabsNavigator
 * Maneja la navegación horizontal por gestos y clics entre las secciones principales.
 */
export default function ClientTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Productos"
      screenOptions={{
        // Estilos de la barra de pestañas superior
        tabBarStyle: {
          backgroundColor: '#ffffff',
          elevation: 2,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        // Línea indicadora inferior de la pestaña activa
        tabBarIndicatorStyle: {
          backgroundColor: '#ff4500',
          height: 3,
        },
        tabBarActiveTintColor: '#ff4500',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Productos" 
        component={CatalogoScreen} 
        options={{ tabBarLabel: 'PRODUCTOS' }}
      />
      <Tab.Screen 
        name="Ofertas" 
        component={CleanOffersScreen} 
        options={{ tabBarLabel: 'OFERTAS 🔥' }}
      />
      <Tab.Screen 
        name="Historial" 
        component={HistorialScreen} 
        options={{ tabBarLabel: 'COMPRAS' }}
      />
      <Tab.Screen 
        name="Consumo" 
        component={MiConsumoScreen} 
        options={{ tabBarLabel: 'CONSUMO 📊' }}
      />
    </Tab.Navigator>
  );
}