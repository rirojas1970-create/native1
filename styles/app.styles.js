import { StyleSheet } from 'react-native';

// Exportamos una función que genera y retorna los estilos dinámicos
export const getAppStyles = (insets) => StyleSheet.create({
  appContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingTop: insets.top, // 🌟 SOLUCIÓN: Ajuste automático para el notch de cualquier celular
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
    paddingBottom: 20 // Reducido porque el contenedor de la barra fija inferior ya no se superpone de manera absoluta
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
    paddingBottom: 15 + insets.bottom 
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
    paddingBottom: 20 + insets.bottom, 
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
  },
  
  // ========================================================
  // 🌟 SECCIÓN ADICIONADA: NUEVOS ESTILOS INTEGRADOS ABAJO
  // ========================================================
  badgeOferta: {
    backgroundColor: '#e8f5e9', 
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#81c784' 
  },
  textoBadge: {
    color: '#2e7d32', 
    fontSize: 11,
    fontWeight: 'bold',
  },
  topNavbar: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTopTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#1976d2', // Cambiado a tu azul principal para consistencia
  },
  topTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 0.5,
  },
  activeTopTabText: {
    color: '#1976d2', // Cambiado a tu azul principal
  },
  cardOfertaEspecial: {
    backgroundColor: '#f4f8fc', // 🌟 Contraste suave: Celeste pastel muy refinado
    borderColor: '#d0e3f5',
    borderWidth: 1,
  },
  tagOfertaContraste: {
    backgroundColor: '#e53935', 
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  textoTagOferta: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  precioOferta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 6,
  },
  botonAgregarOferta: {
    backgroundColor: '#e53935',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  barraFijaInferior: {
    backgroundColor: '#1976d2', // 🌟 Cambiado al mismo azul de tu header para mantener la identidad de tu app
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  textoBarraInferior: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ========================================================
  // 📝 REGISTRO DE ESTILOS DEL HISTORIAL DE COMPRAS (DENTRO DEL DISPOSITIVO)
  // ========================================================
  cardHistorial: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50', // Línea verde elegante que marca éxito de pedido
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerHistorial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  fechaHistorial: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  totalHistorial: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  textoItemHistorial: {
    fontSize: 14,
    color: '#444',
    marginVertical: 2,
  }
});