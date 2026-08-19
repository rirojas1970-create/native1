import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarrito } from '../context/CarritoContext';
import OFERTAS_CONFIG from '../data/ofertas.json';
import PRODUCTOS_MOCK from "../data/productos.json";
import { getAppStyles } from '../styles/app.styles';

export default function CatalogoScreen() {
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