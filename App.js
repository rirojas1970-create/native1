import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
// Importamos el Contexto Modulado desde la carpeta que creaste
import { CarritoProvider, useCarrito } from './context/CarritoContext';

// ========================================================
// 1. BASE DE DATOS SIMULADA (PRODUCTOS DE LIMPIEZA)
// ========================================================
const PRODUCTOS_MOCK = [
  {
    id: '1',
    nombre: 'Detergente Premium',
    descripcion: 'Rinde el doble, remueve grasa difícil y cuida tus manos.',
    precio: 2500,
    imagen: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    nombre: 'Desinfectante Lavanda',
    descripcion: 'Elimina el 99.9% de bacterias con un aroma floral duradero.',
    precio: 1800,
    imagen: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    nombre: 'Limpiavidrios Pro',
    descripcion: 'Brillo transparente sin dejar vetas ni marcas de agua.',
    precio: 2100,
    imagen: 'https://images.unsplash.com/photo-1622114631326-7bc28c0a87a2?w=500&auto=format&fit=crop&q=60'
  }
];

// ========================================================
// 2. COMPONENTE: PANTALLA DE CATÁLOGO
// ========================================================
function Catalogo() {
  const { agregarProducto, cantidadTotal, precioTotal, setVerCarrito } = useCarrito();

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
    <CarritoProvider>
      <AppContenido />
    </CarritoProvider>
  );
}

// ========================================================
// 6. HOJA DE ESTILOS (OPTIMIZADA PARA SIMULACIÓN WEB)
// ========================================================
const styles = StyleSheet.create({
  appContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingTop: 40 
  },
  header: { 
    backgroundColor: '#ffffff', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0', 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1976d2' 
  },
  container: { 
    flex: 1 
  },
  lista: { 
    padding: 15, 
    paddingBottom: 100 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    flexDirection: 'row', 
    marginBottom: 15, 
    padding: 12, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  imagen: { 
    width: 90, 
    height: 90, 
    borderRadius: 8, 
    backgroundColor: '#e0e0e0' 
  },
  infoContainer: { 
    flex: 1, 
    marginLeft: 12, 
    justifyContent: 'space-between' 
  },
  nombre: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  descripcion: { 
    fontSize: 12, 
    color: '#666', 
    marginVertical: 4 
  },
  precio: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#2e7d32' 
  },
  botonAgregar: { 
    backgroundColor: '#0288d1', 
    paddingVertical: 6, 
    borderRadius: 6, 
    alignItems: 'center', 
    marginTop: 5 
  },
  textoBoton: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 13 
  },
  barraFlotante: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#1976d2', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16 
  },
  textoBarra: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  botonVerCarrito: { 
    backgroundColor: '#fff', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8 
  },
  textoBotonVer: { 
    color: '#1976d2', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  botonVolver: { 
    padding: 15 
  },
  textoVolver: { 
    color: '#0288d1', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
  cardCarrito: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
    borderLeftWidth: 4, 
    borderLeftColor: '#0288d1' 
  },
  controlesCantidad: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    borderRadius: 20, 
    padding: 4 
  },
  botonMenos: { 
    backgroundColor: '#e57373', 
    width: 30, height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  botonMas: { 
    backgroundColor: '#81c784', 
    width: 30, height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  textoControl: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  cantidadNumero: { 
    marginHorizontal: 12, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  contenedorTotal: { 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
    backgroundColor: '#fff', 
    padding: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#e0e0e0' 
  },
  totalTexto: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    color: '#333' 
  },
  botonWhatsApp: { 
    backgroundColor: '#25D366', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  textoBotonWA: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  textoVacio: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#999', 
    marginTop: 40 
  }
});