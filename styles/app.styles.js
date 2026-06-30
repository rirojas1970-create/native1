import { StyleSheet } from 'react-native';

// Exportamos una función que genera y retorna los estilos dinámicos
export const getAppStyles = (insets) => StyleSheet.create({
  appContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingTop: 40,
    height: '100%', 
    width: '100%', 
  },
  header: { 
    backgroundColor: '#ffffff', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0', 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1976d2' 
  },
  container: { 
    flex: 1 
  },
  lista: { 
    padding: 15, 
    paddingBottom: 100 + insets.bottom // 🌟 Protege el final de la lista
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    flexDirection: 'row', 
    marginBottom: 15, 
    padding: 12, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  imagen: { 
    width: 90, 
    height: 90, 
    borderRadius: 8, 
    backgroundColor: '#e0e0e0' 
  },
  infoContainer: { 
    flex: 1, 
    marginLeft: 12, 
    justifyContent: 'space-between' 
  },
  nombre: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  descripcion: { 
    fontSize: 12, 
    color: '#666', 
    marginVertical: 4 
  },
  precio: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#2e7d32' 
  },
  botonAgregar: { 
    backgroundColor: '#0288d1', 
    paddingVertical: 6, 
    borderRadius: 6, 
    alignItems: 'center', 
    marginTop: 5 
  },
  textoBoton: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 13 
  },
  barraFlotante: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#1976d2', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 15,
    paddingBottom: 15 + insets.bottom // 🌟 Evita que se superponga con los botones del celular
  },
  textoBarra: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  botonVerCarrito: { 
    backgroundColor: '#fff', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8 
  },
  textoBotonVer: { 
    color: '#1976d2', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  botonVolver: { 
    padding: 15 
  },
  textoVolver: { 
    color: '#0288d1', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
  cardCarrito: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
    borderLeftWidth: 4, 
    borderLeftColor: '#0288d1' 
  },
  controlesCantidad: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    borderRadius: 20, 
    padding: 4 
  },
  botonMenos: { 
    backgroundColor: '#e57373', 
    width: 30, height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  botonMas: { 
    backgroundColor: '#81c784', 
    width: 30, height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  textoControl: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  cantidadNumero: { 
    marginHorizontal: 12, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  contenedorTotal: { 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
    backgroundColor: '#fff', 
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20 + insets.bottom, // 🌟 Evita la superposición en el carrito
    borderTopWidth: 1, 
    borderTopColor: '#e0e0e0' 
  },
  totalTexto: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    color: '#333' 
  },
  botonWhatsApp: { 
    backgroundColor: '#25D366', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  textoBotonWA: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  textoVacio: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#999', 
    marginTop: 40 
  }
});