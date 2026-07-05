import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function CleanOfferCard({ offer, onAddToCart }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{offer.name}</Text>
      <Text style={styles.description}>{offer.description}</Text>
      <Text style={styles.price}>${offer.price}</Text>
      <Button title="Agregar Oferta" onPress={onAddToCart} color="#28a745" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 10,
  },
});