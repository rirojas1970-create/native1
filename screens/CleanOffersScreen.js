import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCarrito } from '../context/CarritoContext';
import CleanOfferCard from '../components/CleanOfferCard';

import ofertasData from '../data/ofertas.json';

export default function CleanOffersScreen() {
  const { agregarProducto } = useCarrito();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setOffers(ofertasData || []);
  }, []);

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

  const renderEmptyOffers = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Hoy no hay ofertas
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CleanOfferCard
            offer={item}
            onAddToCart={() => agregarOferta(item)}
          />
        )}
        ListEmptyComponent={renderEmptyOffers}
        contentContainerStyle={offers.length === 0 ? { flex: 1 } : undefined}
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
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
  },
});