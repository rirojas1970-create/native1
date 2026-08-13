import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarrito } from '../context/CarritoContext';
import { getAppStyles } from '../styles/app.styles';

export default function CarritoScreen() {
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