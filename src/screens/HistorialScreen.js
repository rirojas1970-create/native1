import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarrito } from '../context/CarritoContext';
import { getAppStyles } from '../styles/app.styles';

export default function HistorialScreen() {
  const { historial } = useCarrito();
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  return (
    <View style={styles.container}>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 15, color: '#999', textAlign: 'center', paddingHorizontal: 20 }}>
              Todavía no realizaste compras. ¡Tus pedidos enviados se guardarán automáticamente acá!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
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
        )}
      />
    </View>
  );
}