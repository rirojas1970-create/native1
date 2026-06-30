import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context';
// Importamos el Contexto Modulado desde la carpeta que creaste
import { CarritoProvider, useCarrito } from './context/CarritoContext';

// ========================================================
// 1. BASE DE DATOS SIMULADA (PRODUCTOS DE LIMPIEZA)
// ========================================================
import PRODUCTOS_MOCK from "./data/productos.json";
import { getAppStyles } from './styles/app.styles';
// ========================================================
// 2. COMPONENTE: PANTALLA DE CATÁLOGO
// ========================================================
function Catalogo() {
  const { agregarProducto, cantidadTotal, precioTotal, setVerCarrito } = useCarrito();
  const insets = useSafeAreaInsets()
  // Estilos importados de app.styles.js
  const styles = getAppStyles(insets);


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.descripcion} numberOfLines={2}>{item.descripcion}</Text>
        <Text style={styles.precio}>${item.precio}</Text>
        <TouchableOpacity style={styles.botonAgregar} onPress={() => agregarProducto(item)}>
          <Text style={styles.textoBoton}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTOS_MOCK}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
      
      {/* Barra flotante inferior si hay productos en el carrito */}
      {cantidadTotal > 0 && (
        <View style={styles.barraFlotante}>
          <Text style={styles.textoBarra}>🛒 {cantidadTotal} items | Total: ${precioTotal}</Text>
          <TouchableOpacity style={styles.botonVerCarrito} onPress={() => setVerCarrito(true)}>
            <Text style={styles.textoBotonVer}>Ver Carrito</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ========================================================
// 3. COMPONENTE: PANTALLA DE DETALLE DEL CARRITO
// ========================================================
function Carrito() {
  const { carrito, agregarProducto, eliminarProducto, precioTotal, setVerCarrito, vaciarCarrito } = useCarrito();
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);
  const enviarAWhatsApp = () => {
    // ⚠️ Coloca tu número real aquí (Ejemplo: Código de país + código de área + número)
    const numeroTelefono = "5492323606589"; 
    
    let mensaje = "👋 ¡Hola! Quiero realizar el siguiente pedido de limpieza:\n\n";
    
    carrito.forEach((prod) => {
      mensaje += `• ${prod.cantidad}x ${prod.nombre} ($${prod.precio} c/u) = $${prod.precio * prod.cantidad}\n`;
    });
    
    mensaje += `\n💰 *Total del pedido: $${precioTotal}*`;
    
    // Generamos la URL oficial de WhatsApp e intentamos abrirla
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(url);
    
    // Opcional: Limpiamos el carrito tras enviar el pedido
    vaciarCarrito();
    setVerCarrito(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botonVolver} onPress={() => setVerCarrito(false)}>
        <Text style={styles.textoVolver}>← Volver al Catálogo</Text>
      </TouchableOpacity>

      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.textoVacio}>Tu carrito está vacío</Text>}
        renderItem={({ item }) => (
          <View style={styles.cardCarrito}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>Subtotal: ${item.precio * item.cantidad}</Text>
            </View>
            <View style={styles.controlesCantidad}>
              <TouchableOpacity style={styles.botonMenos} onPress={() => eliminarProducto(item.id)}>
                <Text style={styles.textoControl}>-</Text>
              </TouchableOpacity>
              <Text style={styles.cantidadNumero}>{item.cantidad}</Text>
              <TouchableOpacity style={styles.botonMas} onPress={() => agregarProducto(item)}>
                <Text style={styles.textoControl}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {carrito.length > 0 && (
        <View style={styles.contenedorTotal}>
          <Text style={styles.totalTexto}>Total a Pagar: ${precioTotal}</Text>
          <TouchableOpacity style={styles.botonWhatsApp} onPress={enviarAWhatsApp}>
            <Text style={styles.textoBotonWA}>🚀 Confirmar por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ========================================================
// 4. COMPONENTE INTERNO: CONTROL DE CONTENIDO (NAVEGACIÓN)
// ========================================================
function AppContenido() {
  const { verCarrito } = useCarrito();
  const insets = useSafeAreaInsets(); 
  const styles = getAppStyles(insets);

  return (
    <View style={styles.appContainer}>
      {/* Encabezado dinámico */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {verCarrito ? 'Mi Carrito' : 'Productos'}
        </Text>
      </View>
      
      {/* Renderizado condicional según el estado global */}
      {verCarrito ? <Carrito /> : <Catalogo />}
    </View>
  );
}

// ========================================================
// 5. NÚCLEO DE LA APP (COMPONENTE PRINCIPAL EXPORTADO)
// ========================================================
export default function App() {
  return (
    <SafeAreaProvider> 
      <CarritoProvider>
        <AppContenido />
      </CarritoProvider>
    </SafeAreaProvider>
  );
}

