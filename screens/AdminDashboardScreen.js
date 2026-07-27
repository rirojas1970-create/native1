import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useAdmin } from '../context/AdminContext';

export default function AdminDashboardScreen() {
  const { productos, ofertas, ventas, guardarProducto, guardarOferta } = useAdmin();
  const [vistaActual, setVistaActual] = useState('productos'); // 'productos' | 'ofertas' | 'ventas'

  // Formulario de Producto Temporal
  const [formProd, setFormProd] = useState({ nombre: '', descripcion: '', precio: '', proveedor: '' });
  // Formulario de Oferta Temporal
  const [formOferta, setFormOferta] = useState({ titulo: '', precio: '' });

  const handleAgregarProducto = () => {
    if (!formProd.nombre || !formProd.precio) return;
    guardarProducto({
      nombre: formProd.nombre,
      descripcion: formProd.descripcion,
      precio: parseFloat(formProd.precio),
      proveedor: formProd.proveedor || 'Genérico'
    });
    setFormProd({ nombre: '', descripcion: '', precio: '', proveedor: '' });
  };

  const handleAgregarOferta = () => {
    if (!formOferta.titulo || !formOferta.precio) return;
    guardarOferta({
      titulo: formOferta.titulo,
      precio: parseFloat(formOferta.precio)
    });
    setFormOferta({ titulo: '', precio: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Panel de Control Administrativo</Text>
      
      {/* Navbar de Navegación del Admin */}
      <View style={styles.navbar}>
        {['productos', 'ofertas', 'ventas'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.navButton, vistaActual === tab && styles.navButtonActive]}
            onPress={() => setVistaActual(tab)}
          >
            <Text style={[styles.navText, vistaActual === tab && styles.navTextActive]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* VISTA 1: GESTIÓN DE PRODUCTOS */}
      {vistaActual === 'productos' && (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Cargar Nuevo Producto</Text>
              <TextInput style={styles.input} placeholder="Nombre del producto" value={formProd.nombre} onChangeText={t => setFormProd({...formProd, nombre: t})} />
              <TextInput style={styles.input} placeholder="Descripción o características" value={formProd.descripcion} onChangeText={t => setFormProd({...formProd, descripcion: t})} />
              <TextInput style={styles.input} placeholder="Precio ($)" keyboardType="numeric" value={formProd.precio} onChangeText={t => setFormProd({...formProd, precio: t})} />
              <TextInput style={styles.input} placeholder="Proveedor" value={formProd.proveedor} onChangeText={t => setFormProd({...formProd, proveedor: t})} />
              <TouchableOpacity style={styles.btnGuardar} onPress={handleAgregarProducto}>
                <Text style={styles.btnText}>Agregar al Inventario</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.nombre}</Text>
              <Text style={styles.itemMeta}>Precio: ${item.precio} | Prov: {item.proveedor || 'S/D'}</Text>
            </View>
          )}
        />
      )}

      {/* VISTA 2: GESTIÓN DE OFERTAS / COMBOS */}
      {vistaActual === 'ofertas' && (
        <FlatList
          data={ofertas}
          keyExtractor={(item) => item.id || item.titulo}
          ListHeaderComponent={
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Crear Promoción / Combo Especial</Text>
              <TextInput style={styles.input} placeholder="Ej: Combo: 15% OFF 7 unidades" value={formOferta.titulo} onChangeText={t => setFormOferta({...formOferta, titulo: t})} />
              <TextInput style={styles.input} placeholder="Precio Promocional ($)" keyboardType="numeric" value={formOferta.precio} onChangeText={t => setFormOferta({...formOferta, precio: t})} />
              <TouchableOpacity style={[styles.btnGuardar, { backgroundColor: '#e53935' }]} onPress={handleAgregarOferta}>
                <Text style={styles.btnText}>Lanzar Oferta de Producto</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.itemCard, { borderLeftColor: '#e53935' }]}>
              <Text style={styles.itemTitle}>{item.titulo}</Text>
              <Text style={styles.itemPricePromo}>Precio Combo: ${item.precio}</Text>
            </View>
          )}
        />
      )}

      {/* VISTA 3: AUDITORÍA DE VENTAS */}
      {vistaActual === 'ventas' && (
        <FlatList
          data={ventas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ventaCard}>
              <View style={styles.ventaHeader}>
                <Text style={styles.ventaFecha}>📅 {item.fecha}</Text>
                <Text style={styles.ventaTotal}>Total: ${item.total}</Text>
              </View>
              {item.detalles.map((det, index) => (
                <Text key={index} style={styles.ventaDetalle}>
                  • {det.cantidad}x {det.nombre} (${det.precio} c/u)
                </Text>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#0066cc', textAlign: 'center', marginBottom: 15 },
  navbar: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, borderBottomWidth: 1, borderColor: '#ccc' },
  navButton: { paddingVertical: 10, flex: 1, alignItems: 'center' },
  navButtonActive: { borderBottomWidth: 3, borderColor: '#0066cc' },
  navText: { fontWeight: '600', color: '#666' },
  navTextActive: { color: '#0066cc' },
  formContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 8, elevation: 2, marginBottom: 20 },
  formTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: '#fafafa' },
  btnGuardar: { backgroundColor: '#0066cc', padding: 12, borderRadius: 5, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  itemCard: { backgroundColor: '#fff', padding: 15, borderRadius: 5, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#0066cc', elevation: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold' },
  itemMeta: { color: '#666', marginTop: 4 },
  itemPricePromo: { color: '#e53935', fontWeight: 'bold', marginTop: 4 },
  ventaCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#2e7d32', elevation: 1 },
  ventaHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
  ventaFecha: { color: '#555', fontWeight: '500' },
  ventaTotal: { fontWeight: 'bold', color: '#2e7d32' },
  ventaDetalle: { color: '#444', fontSize: 14, marginVertical: 2 }
});