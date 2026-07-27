import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import OFERTAS_CONFIG from './data/ofertas.json';
import { CarritoProvider, useCarrito } from './context/CarritoContext';
import { AdminProvider } from './context/AdminContext';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import PRODUCTOS_MOCK from "./data/productos.json";
import { getAppStyles } from './styles/app.styles';



// ========================================================
// 1. COMPONENTE: PANTALLA DE CATÁLOGO (PRODUCTOS)
// ========================================================
function Catalogo() {
  const { agregarProducto } = useCarrito(); 
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  const renderItem = ({ item }) => {
    const ofertaAsociada = OFERTAS_CONFIG.find(o => o.productoIds?.includes(item.id));

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.nombre}>{item.nombre}</Text>
            
            {/* Badge de Oferta */}
            {ofertaAsociada && (
              <View style={styles.badgeOferta}>
                <Text style={styles.textoBadge}>🔥 {ofertaAsociada.descripcion}</Text>
              </View>
            )}

            <Text style={styles.descripcion} numberOfLines={2}>{item.descripcion}</Text>
          </View>
          
          <View>
            <Text style={styles.precio}>${item.precio}</Text>
            <TouchableOpacity style={styles.botonAgregar} onPress={() => agregarProducto(item)}>
              <Text style={styles.textoBoton}>Agregar al Carrito</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTOS_MOCK}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

// ========================================================
// 2. COMPONENTE: PANTALLA DE OFERTAS / COMBOS
// ========================================================
function Ofertas() {
  const { agregarProducto } = useCarrito();
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  const transformarOfertaAProducto = (oferta) => {
    return {
      id: `COMBO_${oferta.id}`, 
      nombre: oferta.nombre || `Combo: ${oferta.descripcion}`,
      descripcion: oferta.descripcion,
      precio: oferta.precioCombo || 0, 
      imagen: oferta.imagen || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500", 
    };
  };

  const renderItem = ({ item }) => {
    const comboFormateado = transformarOfertaAProducto(item);

    return (
      <View style={[styles.card, styles.cardOfertaEspecial]}>
        <Image source={{ uri: comboFormateado.imagen }} style={styles.imagen} />
        <View style={styles.infoContainer}>
          <View>
            <View style={styles.tagOfertaContraste}>
              <Text style={styles.textoTagOferta}>🔥 OFERTA EXCLUSIVA</Text>
            </View>
            <Text style={[styles.nombre, { marginTop: 8, fontSize: 16 }]}>
              {comboFormateado.nombre}
            </Text>
          </View>
          
          <View style={{ marginTop: 8 }}>
            <Text style={styles.precioOferta}>${comboFormateado.precio}</Text>
            <TouchableOpacity 
              style={styles.botonAgregarOferta} 
              onPress={() => agregarProducto(comboFormateado)}
            >
              <Text style={styles.textoBoton}>Agregar Combo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={OFERTAS_CONFIG}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 18, color: '#888', fontWeight: 'bold' }}>Hoy no hay ofertas</Text>
          </View>
        }
      />
    </View>
  );
}

// ========================================================
// 3. COMPONENTE: PANTALLA DE DETALLE DEL CARRITO
// ========================================================
function Carrito() {
  const { 
    carrito, 
    agregarProducto, 
    eliminarProducto, 
    precioTotal, 
    setVerCarrito, 
    vaciarCarrito, 
    detalleDescuentos,
    registrarCompraEnHistorial 
  } = useCarrito();

  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  const enviarAWhatsApp = () => {
    const numeroTelefono = "5492323606589"; 
    let mensaje = "👋 ¡Hola! Quiero realizar el siguiente pedido de limpieza:\n\n";
    
    carrito.forEach((prod) => {
      if (prod.id.toString().startsWith("COMBO_")) {
        mensaje += `• ${prod.cantidad}x *[COMBO]* ${prod.nombre} = $${prod.precio * prod.cantidad}\n`;
      } else {
        const descuentoProd = detalleDescuentos?.find(d => d.productoId === prod.id);
        if (descuentoProd) {
          const subtotalConDescuento = (prod.precio * prod.cantidad) - descuentoProd.ahorro;
          mensaje += `• ${prod.cantidad}x ${prod.nombre} = $${subtotalConDescuento} (¡${descuentoProd.descripcion}!)\n`;
        } else {
          mensaje += `• ${prod.cantidad}x ${prod.nombre} = $${prod.precio * prod.cantidad}\n`;
        }
      }
    });
    
    if (detalleDescuentos && detalleDescuentos.length > 0) {
      mensaje += "\n🎉 *Descuentos aplicados por promoción:*";
      detalleDescuentos.forEach((d) => {
        mensaje += `\n  - Bonificación en ${d.nombre}: -$${d.ahorro}`;
      });
    }
    
    mensaje += `\n\n💰 *Total Neto del pedido: $${precioTotal}*`;
    
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(url);
    
    registrarCompraEnHistorial(); 
    vaciarCarrito();
    setVerCarrito(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botonVolver} onPress={() => setVerCarrito(false)}>
        <Text style={styles.textoVolver}>← Volver al Menú</Text>
      </TouchableOpacity>

      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.textoVacio}>Tu carrito está vacío</Text>}
        renderItem={({ item }) => {
          const descuentoActivo = detalleDescuentos?.find(d => d.productoId === item.id);
          const subtotalNormal = item.precio * item.cantidad;
          const subtotalFinal = descuentoActivo ? (subtotalNormal - descuentoActivo.ahorro) : subtotalNormal;

          return (
            <View style={styles.cardCarrito}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                {descuentoActivo ? (
                  <View>
                    <Text style={{ fontSize: 13, color: '#888', textDecorationLine: 'line-through' }}>
                      Subtotal: ${subtotalNormal}
                    </Text>
                    <Text style={[styles.precio, { color: '#e53935', fontSize: 15 }]}>
                      Oferta: ${subtotalFinal}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.precio}>Subtotal: ${subtotalNormal}</Text>
                )}
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
          );
        }}
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
// 4. COMPONENTE: PANTALLA DE HISTORIAL DE COMPRAS
// ========================================================
function HistorialCompras() {
  const { historial } = useCarrito();
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  const renderItem = ({ item }) => (
    <View style={styles.cardHistorial}>
      <View style={styles.headerHistorial}>
        <Text style={styles.fechaHistorial}>📅 {item.fecha}</Text>
        <Text style={styles.totalHistorial}>Total: ${item.total}</Text>
      </View>
      {item.items.map((prod, idx) => (
        <Text key={idx} style={styles.textoItemHistorial}>
          • {prod.cantidad}x {prod.nombre} (${prod.precio} c/u)
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 16, color: '#999', fontWeight: '500', textAlign: 'center', paddingHorizontal: 20 }}>
              Todavía no realizaste compras. ¡Tus pedidos enviados por WhatsApp se guardarán automáticamente acá!
            </Text>
          </View>
        }
      />
    </View>
  );
}

// ========================================================
// 5. COMPONENTE INTERNO: CONTROL DE CONTENIDO (CLIENTE)
// ========================================================
function AppContenidoCliente() {
  const { verCarrito, setVerCarrito, cantidadTotal, precioTotal } = useCarrito();
  const [tabActual, setTabActual] = useState('productos'); 
  const insets = useSafeAreaInsets(); 
  const styles = getAppStyles(insets);

  const renderVistaActiva = () => {
    if (verCarrito) return <Carrito />;
    if (tabActual === 'ofertas') return <Ofertas />;
    if (tabActual === 'historial') return <HistorialCompras />;
    return <Catalogo />;
  };

  return (
    <View style={[styles.appContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>La Diagonal </Text>
      </View>

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
              MIS COMPRAS 📝
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


// ... (Tus componentes Catalogo, Ofertas, Carrito, HistorialCompras y AppContenidoCliente siguen igual arriba)

// ========================================================
// 6. CONTENIDO PRINCIPAL (Navegación + Margen de Barra)
// ========================================================
function MainApp() {
  const [modoAdmin, setModoAdmin] = useState(false);
  const insets = useSafeAreaInsets(); // Calcula el espacio exacto del notch / status bar

  return (
    <View style={{ flex: 1, backgroundColor: modoAdmin ? '#0066cc' : '#222' }}>
      
      {/* Botón Administrador con Padding Seguro */}
      <TouchableOpacity 
        style={{ 
          paddingTop: Math.max(insets.top, 12), 
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: modoAdmin ? '#004c99' : '#333', 
          alignItems: 'center' 
        }}
        onPress={() => setModoAdmin(!modoAdmin)}
        activeOpacity={0.8}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>
          {modoAdmin ? "🔄 Cambiar a VISTA CLIENTE" : "⚙️ Ir a GESTIÓN ADMINISTRADOR"}
        </Text>
      </TouchableOpacity>

      {/* Vistas de la aplicación */}
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {modoAdmin ? <AdminDashboardScreen /> : <AppContenidoCliente />}
      </View>

    </View>
  );
}

// ========================================================
// 7. EXPORTACIÓN PRINCIPAL (Proveedores de Estado)
// ========================================================
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