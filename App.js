import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Contextos
import { CarritoProvider, useCarrito } from './context/CarritoContext';
import { AdminProvider } from './context/AdminContext';

// Estilos
import { getAppStyles } from './styles/app.styles';

// Pantallas Cliente
import CatalogoScreen from './screens/CatalogoScreen';
import CleanOffersScreen from './screens/CleanOffersScreen';
import CarritoScreen from './screens/CarritoScreen';
import HistorialScreen from './screens/HistorialScreen';
import MiConsumoScreen from './screens/MiConsumoScreen';

// Pantalla Administrador
import AdminDashboardScreen from './screens/AdminDashboardScreen';

function AppContenido() {
  const { verCarrito, setVerCarrito, cantidadTotal, precioTotal } = useCarrito();

  const [tabActual, setTabActual] = useState('productos');
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

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
    <View
      style={[
        styles.appContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>La Diagonal 🔥</Text>
      </View>

      {!verCarrito && (
        <View style={styles.topNavbar}>
          <TouchableOpacity
            style={[
              styles.topTab,
              tabActual === 'productos' && styles.activeTopTab,
            ]}
            onPress={() => setTabActual('productos')}
          >
            <Text
              style={[
                styles.topTabText,
                tabActual === 'productos' && styles.activeTopTabText,
              ]}
            >
              PRODUCTOS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.topTab,
              tabActual === 'ofertas' && styles.activeTopTab,
            ]}
            onPress={() => setTabActual('ofertas')}
          >
            <Text
              style={[
                styles.topTabText,
                tabActual === 'ofertas' && styles.activeTopTabText,
              ]}
            >
              OFERTAS 🔥
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.topTab,
              tabActual === 'historial' && styles.activeTopTab,
            ]}
            onPress={() => setTabActual('historial')}
          >
            <Text
              style={[
                styles.topTabText,
                tabActual === 'historial' && styles.activeTopTabText,
              ]}
            >
              COMPRAS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.topTab,
              tabActual === 'consumo' && styles.activeTopTab,
            ]}
            onPress={() => setTabActual('consumo')}
          >
            <Text
              style={[
                styles.topTabText,
                tabActual === 'consumo' && styles.activeTopTabText,
              ]}
            >
              CONSUMO 📊
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ flex: 1 }}>
        {renderVistaActiva()}
      </View>

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

function MainApp() {
  const [modoAdmin, setModoAdmin] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: modoAdmin ? '#0066cc' : '#222',
      }}
    >
      <TouchableOpacity
        style={{
          paddingTop: Math.max(insets.top, 12),
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: modoAdmin ? '#004c99' : '#333',
          alignItems: 'center',
        }}
        onPress={() => setModoAdmin(!modoAdmin)}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 13,
          }}
        >
          {modoAdmin
            ? '🔄 Cambiar a VISTA CLIENTE'
            : '⚙️ Ir a GESTIÓN ADMINISTRADOR'}
        </Text>
      </TouchableOpacity>

      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {modoAdmin ? <AdminDashboardScreen /> : <AppContenido />}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AdminProvider>
        <CarritoProvider>
          <MainApp />
        </CarritoProvider>
      </AdminProvider>
    </SafeAreaProvider>
  );
}