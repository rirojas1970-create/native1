import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarrito } from '../context/CarritoContext';
import { getAppStyles } from '../styles/app.styles';

export default function MiConsumoScreen() {
  const { historial, filtroEstadistica, setFiltroEstadistica } = useCarrito();
  const insets = useSafeAreaInsets();
  const styles = getAppStyles(insets);

  // Motor analítico aislado para evitar re-renders innecesarios en la app global
  const analiticas = useMemo(() => {
    const ahora = new Date();
    const unDiaMilisegundos = 24 * 60 * 60 * 1000;

    const filtrados = historial.filter((pedido) => {
      const deltaDias = (ahora.getTime() - parseInt(pedido.id)) / unDiaMilisegundos;

      if (filtroEstadistica === 'mes') {
        const d = new Date(parseInt(pedido.id));
        return d.getMonth() === ahora.getMonth() && d.getFullYear() === ahora.getFullYear();
      }
      if (filtroEstadistica === 'bimestre') return deltaDias <= 60;
      if (filtroEstadistica === 'trimestre') return deltaDias <= 90;
      if (filtroEstadistica === 'semestre') return deltaDias <= 180;
      return true;
    });

    let dineroTotal = 0;
    let cantidadProductosTotal = 0;
    const mapeoCantidades = {};

    filtrados.forEach((pedido) => {
      dineroTotal += pedido.total;
      pedido.items.forEach((item) => {
        cantidadProductosTotal += item.cantidad;
        mapeoCantidades[item.nombre] = (mapeoCantidades[item.nombre] || 0) + item.cantidad;
      });
    });

    const podio = Object.entries(mapeoCantidades)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return { dineroTotal, cantidadProductosTotal, podio, totalPedidos: filtrados.length };
  }, [historial, filtroEstadistica]);

  const botonesFiltro = [
    { id: 'mes', label: 'Mes' },
    { id: 'bimestre', label: '60 Días' },
    { id: 'trimestre', label: 'Trimestre' },
    { id: 'semestre', label: 'Semestre' },
  ];

  if (historial.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 16, color: '#999', textAlign: 'center' }}>
          Hacé tu primer pedido por WhatsApp para activar los gráficos de consumo inteligente.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.lista}>
      {/* 1. Selector de Filtro Temporal */}
      <View style={styles.contenedorFiltrosEstadistica}>
        {botonesFiltro.map((btn) => (
          <TouchableOpacity
            key={btn.id}
            style={[
              styles.botonFiltroEstadistica,
              filtroEstadistica === btn.id && styles.botonFiltroEstadisticaActivo,
            ]}
            onPress={() => setFiltroEstadistica(btn.id)}
          >
            <Text
              style={[
                styles.textoFiltroEstadistica,
                filtroEstadistica === btn.id && styles.textoFiltroEstadisticaActivo,
              ]}
            >
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 2. Cuadrícula de KPIs */}
      <View style={styles.filaKpiEstadistica}>
        <View style={styles.tarjetaKpiEstadistica}>
          <Text style={styles.tituloKpiEstadistica}>Inversión Total</Text>
          <Text style={styles.valorKpiEstadistica}>${analiticas.dineroTotal}</Text>
        </View>
        <View style={styles.tarjetaKpiEstadistica}>
          <Text style={styles.tituloKpiEstadistica}>Artículos Comprados</Text>
          <Text style={styles.valorKpiEstadistica}>{analiticas.cantidadProductosTotal} u.</Text>
        </View>
      </View>

      <View style={[styles.tarjetaKpiEstadistica, { width: '100%', marginTop: 0, marginBottom: 20 }]}>
        <Text style={styles.tituloKpiEstadistica}>Pedidos Enviados por WhatsApp</Text>
        <Text style={[styles.valorKpiEstadistica, { color: '#1976d2' }]}>{analiticas.totalPedidos} órdenes</Text>
      </View>

      {/* 3. Podio de Consumo */}
      <View style={styles.contenedorPodioEstadistica}>
        <Text style={styles.tituloSeccionEstadistica}>🏆 Tus 3 Productos Más Pedidos</Text>
        
        {analiticas.podio.length === 0 ? (
          <Text style={{ color: '#888', fontStyle: 'italic', marginTop: 10 }}>No hay datos en este rango.</Text>
        ) : (
          analiticas.podio.map((item, index) => {
            const medallas = ['🥇', '🥈', '🥉'];
            return (
              <View key={index} style={styles.filaItemPodioEstadistica}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 18, marginRight: 10 }}>{medallas[index]}</Text>
                  <Text style={styles.nombreItemPodioEstadistica} numberOfLines={1}>{item[0]}</Text>
                </View>
                <Text style={styles.cantidadItemPodioEstadistica}>{item[1]} unidades</Text>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}