import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CleanOfferCard({ offer, onAddToCart }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {offer.nombre || offer.name}
      </Text>

      <Text style={styles.description}>
        {offer.descripcion || offer.description}
      </Text>

      <Text style={styles.price}>
        ${offer.precioCombo ?? offer.precio ?? offer.price ?? 0}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onAddToCart}
      >
        <Text style={styles.buttonText}>Agregar Oferta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
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
    marginVertical: 6,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b8f3c',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});