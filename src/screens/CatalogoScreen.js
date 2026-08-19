// src/screens/CatalogoScreen.js
import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 📦 Contextos y utilidades de estado
import { useCarrito } from '../context/CarritoContext';
import { useSearch } from '../hooks/useSearch';

// 🔍 Componentes modulares UI
import { SearchBar } from '../components/SearchBar';

// 📊 Datos estáticos de configuración y catálogo
import OFERTAS_CONFIG from '../data/ofertas.json';
import PRODUCTOS_MOCK from '../data/productos.json';

// 🎨 Sistema de diseño y estilos reactivos
import { getAppStyles } from '../styles/app.styles';

export default function CatalogoScreen() {
  const { agregarProducto } = useCarrito(); 
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  // 🎣 Hook personalizado para filtrar dinámicamente los productos según el término ingresado.
  // Buscamos por las propiedades: 'nombre', 'descripcion' y 'categoria'.
  const { query, setQuery, clearQuery, filteredData } = useSearch(
    PRODUCTOS_MOCK,
    ['nombre', 'categoria']
  );

  // 🧱 Renderizado individual de la tarjeta del producto (optimizada)
  const renderItem = ({ item }) => {
    // Verificamos si este producto específico pertenece a alguna oferta configurada
    const ofertaAsociada = OFERTAS_CONFIG.find(o => o.productoIds?.includes(item.id));

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.nombre}>{item.nombre}</Text>
            
            {/* 🏷️ Badge dinámico de Oferta */}
            {ofertaAsociada && (
              <View style={styles.badgeOferta}>
                <Text style={styles.textoBadge}>🔥 {ofertaAsociada.descripcion}</Text>
              </View>
            )}

            <Text style={styles.descripcion} numberOfLines={2}>
              {item.descripcion}
            </Text>
          </View>
          
          <View>
            <Text style={styles.precio}>${item.precio}</Text>
            <TouchableOpacity 
              style={styles.botonAgregar} 
              onPress={() => agregarProducto(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBoton}>Agregar al Carrito</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Buscador interactivo fijo en el top de la pantalla */}
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={clearQuery}
        placeholder="Buscar por producto o categoría..."
      />

      {/* 📋 Lista filtrada en tiempo real mediante el custom hook */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        // 🚫 Estado vacío cuando la búsqueda no coincide con ningún producto
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#888', textAlign: 'center' }}>
              No se encontraron productos que coincidan con "{query}"
            </Text>
          </View>
        }
      />
    </View>
  );
}