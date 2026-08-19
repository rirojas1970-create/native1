// src/screens/CleanOffersScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// 📦 Contextos y hooks personalizados
import { useCarrito } from '../context/CarritoContext';
import { useSearch } from '../hooks/useSearch';

// 🔍 Componentes de interfaz de usuario
import { SearchBar } from '../components/SearchBar';
import CleanOfferCard from '../components/CleanOfferCard';

// 📊 Datos estáticos de ofertas
import ofertasData from '../data/ofertas.json';

export default function CleanOffersScreen() {
  const { agregarProducto } = useCarrito();
  const [offers, setOffers] = useState([]);

  // 🔄 Carga inicial de ofertas desde la fuente de datos
  useEffect(() => {
    setOffers(ofertasData || []);
  }, []);

  // 🎣 Integración del Custom Hook de Búsqueda
  // Le pasamos la lista de ofertas 'offers' y definimos las propiedades de búsqueda.
  const { query, setQuery, clearQuery, filteredData } = useSearch(
    offers,
    ['descripcion', 'id']
  );

  // 🛒 Transformación e inclusión de la oferta/combo al carrito como un ítem único
  const agregarOferta = (offer) => {
    const producto = {
      id: `COMBO_${offer.id}`,
      nombre: offer.descripcion,
      descripcion: offer.descripcion,
      precio: offer.precioCombo,
      imagen: offer.imagen || '',
    };

    agregarProducto(producto);
  };

  // 🚫 Componente de estado vacío dinámico (para cuando no hay ofertas o la búsqueda no arroja resultados)
  const renderEmptyOffers = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {query.trim().length > 0
          ? `No se encontraron ofertas que coincidan con "${query}"`
          : 'Hoy no hay ofertas de limpieza disponibles'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Buscador en tiempo real integrado en la vista de ofertas */}
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={clearQuery}
        placeholder="Buscar combo u oferta..."
      />

      {/* 📋 Lista optimizada renderizando únicamente el resultado del hook 'filteredData' */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CleanOfferCard
            offer={item}
            onAddToCart={() => agregarOferta(item)}
          />
        )}
        ListEmptyComponent={renderEmptyOffers}
        contentContainerStyle={filteredData.length === 0 ? { flex: 1 } : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
    textAlign: 'center',
  },
});