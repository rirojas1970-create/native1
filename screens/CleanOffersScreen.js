import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCleanCart } from '../context/CleanCartContext';
import CleanOfferCard from '../components/CleanOfferCard';

// Importamos directamente tus datos locales de ofertas
import ofertasData from '../data/ofertas.json'; 

export default function CleanOffersScreen() {
  const { addToCart } = useCleanCart();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Cargamos los datos del JSON al iniciar la pantalla
    setOffers(ofertasData || []);
  }, []);

  // Componente para cuando la lista esté vacía
  const renderEmptyOffers = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Hoy no hay ofertas</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CleanOfferCard offer={item} onAddToCart={() => addToCart(item)} />
        )}
        ListEmptyComponent={renderEmptyOffers}
        contentContainerStyle={offers.length === 0 && { flex: 1 }}
      />
    </View>
  );
}

