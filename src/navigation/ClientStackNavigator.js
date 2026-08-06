import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Contexto global del Carrito
import { useCarrito } from '../context/CarritoContext';

// Estilos existentes del proyecto
import { getAppStyles } from '../styles/app.styles';

// Navegador de pestañas y pantalla de Carrito
import ClientTabsNavigator from './ClientTabsNavigator';
import CarritoScreen from '../screens/CarritoScreen';

const Stack = createNativeStackNavigator();

/**
 * Componente Layout principal para la experiencia del cliente.
 * Renderiza el Header institucional, las pestañas y el botón flotante del Carrito.
 */
function ClientMainLayout({ navigation }) {
  const { cantidadTotal, precioTotal, setVerCarrito } = useCarrito();
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  // Manejador para abrir la pantalla de carrito
  const handleAbrirCarrito = () => {
    if (setVerCarrito) setVerCarrito(true);
    navigation.navigate('Carrito');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Header fijo institucional */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>La Diagonal 🔥</Text>
      </View>

      {/* Navegación por pestañas */}
      <ClientTabsNavigator />

      {/* Barra Fija Inferior del Carrito (Solo visible si hay productos agregados) */}
      {cantidadTotal > 0 && (
        <TouchableOpacity
          style={styles.barraFijaInferior}
          onPress={handleAbrirCarrito}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBarraInferior}>
            🛒 Ver Carrito ({cantidadTotal}) | Total: ${precioTotal}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/**
 * ClientStackNavigator
 * Controla el flujo entre la vista principal del cliente y el modal del Carrito de compras.
 */
export default function ClientStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClientMain" component={ClientMainLayout} />
      <Stack.Screen 
        name="Carrito" 
        component={CarritoScreen} 
        options={{ 
          headerShown: true, 
          title: 'Tu Carrito de Compras',
          presentation: 'modal', // Presentación modal tipo tarjeta deslizante
          headerStyle: { backgroundColor: '#222222' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
    </Stack.Navigator>
  );
}