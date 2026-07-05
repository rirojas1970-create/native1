import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import OFERTAS_CONFIG from './data/ofertas.json';
import { CarritoProvider, useCarrito } from './context/CarritoContext';
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
// 2. COMPONENTE: PANTALLA DE OFERTAS / COMBOS (DISEÑO MEJORADO)
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
    detalleDescuentos 
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
// 4. COMPONENTE INTERNO: CONTROL DE CONTENIDO (NAVEGACIÓN INTERNA)
// ========================================================
function AppContenido() {
  const { verCarrito, setVerCarrito, cantidadTotal, precioTotal } = useCarrito();
  const [tabActual, setTabActual] = useState('productos'); 
  const insets = useSafeAreaInsets(); 
  const styles = getAppStyles(insets);

  const renderVistaActiva = () => {
    if (verCarrito) return <Carrito />;
    if (tabActual === 'ofertas') return <Ofertas />;
    return <Catalogo />;
  };

  return (
    <View style={[styles.appContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Header Principal Fijo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>La Diagonal </Text>
      </View>

      {/* Pestañas de navegación superiores usando el módulo 'styles' centralizado */}
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
        </View>
      )}

      {/* Contenido principal de la pantalla activa */}
      <View style={{ flex: 1 }}>
        {renderVistaActiva()}
      </View>

      {/* Barra de acceso rápido al Carrito abajo del todo mapeada con el módulo 'styles' */}
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

// ========================================================
// 5. NÚCLEO DE LA APP (COMPONENTE EXPORTADO)
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