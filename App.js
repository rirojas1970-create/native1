import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// 📦 Importación del Estado Global / Contexto
import { CarritoProvider, useCarrito } from './context/CarritoContext';

// 🎨 Importación del Motor de Estilos Modular
import { getAppStyles } from './styles/app.styles';

// 📺 Importación de Pantallas Modulares desde la carpeta screens
import CatalogoScreen from './screens/CatalogoScreen';
import CleanOffersScreen from './screens/CleanOffersScreen'; // Tu vista existente de Ofertas
import CarritoScreen from './screens/CarritoScreen';
import HistorialScreen from './screens/HistorialScreen';
import MiConsumoScreen from './screens/MiConsumoScreen';

function AppContenido() {
  const { verCarrito, setVerCarrito, cantidadTotal, precioTotal } = useCarrito();
  const [tabActual, setTabActual] = useState('productos'); 
  const insets = useSafeAreaInsets(); 
  const styles = getAppStyles(insets);

  // Orquestador de renderizado dinámico basado en el estado de navegación local
  const renderVistaActiva = () => {
    if (verCarrito) return <CarritoScreen />;
    
    switch (tabActual) {
      case 'ofertas':
        return <CleanOffersScreen />;
      case 'historial':
        return <HistorialScreen />;
      case 'consumo':
        return <MiConsumoScreen />;
      case 'productos':
      default:
        return <CatalogoScreen />;
    }
  };

  return (
    <View style={[styles.appContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
      {/* Header Principal Fijo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>La Diagonal 🔥</Text>
      </View>

      {/* Navbar Superior con las 4 pestañas modulares */}
      {!verCarrito && (
        <View style={styles.topNavbar}>
          <TouchableOpacity 
            style={[styles.topTab, tabActual === 'productos' && styles.activeTopTab]} 
            onPress={() => setTabActual('productos')}
          >
            <Text style={[styles.topTabText, tabActual === 'productos' && styles.activeTopTabText]}>
              PRODUCTOS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.topTab, tabActual === 'ofertas' && styles.activeTopTab]} 
            onPress={() => setTabActual('ofertas')}
          >
            <Text style={[styles.topTabText, tabActual === 'ofertas' && styles.activeTopTabText]}>
              OFERTAS 🔥
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.topTab, tabActual === 'historial' && styles.activeTopTab]} 
            onPress={() => setTabActual('historial')}
          >
            <Text style={[styles.topTabText, tabActual === 'historial' && styles.activeTopTabText]}>
              COMPRAS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.topTab, tabActual === 'consumo' && styles.activeTopTab]} 
            onPress={() => setTabActual('consumo')}
          >
            <Text style={[styles.topTabText, tabActual === 'consumo' && styles.activeTopTabText]}>
              CONSUMO 📊
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contenedor de renderizado de la pantalla activa */}
      <View style={{ flex: 1 }}>
        {renderVistaActiva()}
      </View>

      {/* Barra de acceso rápido al Carrito Activo */}
      {!verCarrito && cantidadTotal > 0 && (
        <TouchableOpacity 
          style={styles.barraFijaInferior} 
          onPress={() => setVerCarrito(true)}
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

export default function App() {
  return (
    <SafeAreaProvider> 
      <CarritoProvider>
        <AppContenido />
      </CarritoProvider>
    </SafeAreaProvider>
  );
}