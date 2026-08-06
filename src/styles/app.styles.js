import { StyleSheet } from 'react-native';

export const getAppStyles = (insets) => StyleSheet.create({
  appContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingTop: insets.top, 
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
    paddingBottom: 20 
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
    borderBottomColor: '#1976d2', 
  },
  topTabText: {
    fontSize: 12, // Reducido levemente para que entren perfecto las 4 opciones en cualquier pantalla
    fontWeight: '700',
    color: '#666',
    letterSpacing: 0.3,
  },
  activeTopTabText: {
    color: '#1976d2', 
  },
  cardOfertaEspecial: {
    backgroundColor: '#f4f8fc', 
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
    backgroundColor: '#1976d2', 
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
  cardHistorial: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50', 
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
  },

  // ========================================================
  // 📈 NUEVOS ESTILOS INTERNOS PARA EL PANEL DE ESTADÍSTICAS
  // ========================================================
  contenedorFiltrosEstadistica: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  botonFiltroEstadistica: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  botonFiltroEstadisticaActivo: {
    backgroundColor: '#1976d2', // Resalta con el azul principal
  },
  textoFiltroEstadistica: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  textoFiltroEstadisticaActivo: {
    color: '#ffffff',
  },
  filaKpiEstadistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tarjetaKpiEstadistica: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '48%', // Coloca los recuadros en paralelo
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  tituloKpiEstadistica: {
    fontSize: 12,
    color: '#777',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  valorKpiEstadistica: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32', // Verde de éxito/dinero
  },
  contenedorPodioEstadistica: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  tituloSeccionEstadistica: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  filaItemPodioEstadistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fafafa',
  },
  nombreItemPodioEstadistica: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  cantidadItemPodioEstadistica: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
  },
});