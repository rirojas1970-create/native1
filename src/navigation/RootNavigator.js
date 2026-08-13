import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Importación del flujo de pantallas del Cliente y del Dashboard de Administrador
import ClientStackNavigator from './ClientStackNavigator';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';

/**
 * RootNavigator
 * Se encarga de alternar entre la vista de Gestión de Administrador y la Vista del Cliente.
 */
export default function RootNavigator() {
  const [modoAdmin, setModoAdmin] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: modoAdmin ? '#0066cc' : '#222222',
      }}
    >
      {/* Botón superior de conmutación de Rol (Admin / Cliente) */}
      <TouchableOpacity
        style={{
          paddingTop: Math.max(insets.top, 12),
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: modoAdmin ? '#004c99' : '#333333',
          alignItems: 'center',
        }}
        onPress={() => setModoAdmin((prev) => !prev)}
        activeOpacity={0.8}
      >
        <Text
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 13,
          }}
        >
          {modoAdmin
            ? '🔄 Cambiar a VISTA CLIENTE'
            : '⚙️ Ir a GESTIÓN ADMINISTRADOR'}
        </Text>
      </TouchableOpacity>

      {/* Renderizado condicional del cuerpo principal */}
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {modoAdmin ? <AdminDashboardScreen /> : <ClientStackNavigator />}
      </View>
    </View>
  );
}