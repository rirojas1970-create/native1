// src/styles/getAppStyles.js
import { StyleSheet } from 'react-native';
// 📦 Importamos los tokens centralizados para desacoplar valores duros
import { colors, spacing, typography, borderRadius, shadows } from './theme';

export const getAppStyles = (insets) => StyleSheet.create({

  // ========================================================
  // 🌐 1. LAYOUT Y CONTENEDORES GLOBALES
  // ========================================================
  appContainer: { 
    flex: 1, 
    backgroundColor: colors.background, 
    paddingTop: insets.top, 
    height: '100%', 
    width: '100%', 
  },
  container: { 
    flex: 1 
  },
  header: { 
    backgroundColor: colors.surface, 
    padding: spacing.lg, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.border, 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: typography.fontSize.header, 
    fontWeight: typography.fontWeight.bold, 
    color: colors.primary 
  },
  textoVacio: { 
    textAlign: 'center', 
    fontSize: typography.fontSize.title, 
    color: colors.textMuted, 
    marginTop: 40 
  },
  botonVolver: { 
    padding: spacing.lg 
  },
  textoVolver: { 
    color: colors.primaryDark, 
    fontWeight: typography.fontWeight.bold, 
    fontSize: typography.fontSize.subheading 
  },

  // ========================================================
  // 🧭 2. NAVEGACIÓN (TOP NAVBAR & BOTTOM BAR)
  // ========================================================
  topNavbar: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTopTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary, 
  },
  topTabText: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: typography.letterSpacing.tight,
  },
  activeTopTabText: {
    color: colors.primary, 
  },
  barraFlotante: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: colors.primary, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: spacing.xxl, 
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg + insets.bottom 
  },
  textoBarra: { 
    color: colors.textLight, 
    fontSize: typography.fontSize.subheading, 
    fontWeight: typography.fontWeight.bold 
  },
  botonVerCarrito: { 
    backgroundColor: colors.surface, 
    paddingHorizontal: spacing.md, 
    paddingVertical: spacing.xs + 2, 
    borderRadius: borderRadius.md 
  },
  textoBotonVer: { 
    color: colors.primary, 
    fontWeight: typography.fontWeight.bold, 
    fontSize: typography.fontSize.small 
  },
  barraFijaInferior: {
    backgroundColor: colors.primary, 
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    ...shadows.topBar, // Aplicación de sombra reutilizable
  },
  textoBarraInferior: {
    color: colors.textLight,
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
  },

  // ========================================================
  // 🛍️ 3. PANTALLA DE PRODUCTOS & TARJETAS
  // ========================================================
  lista: { 
    padding: spacing.lg, 
    paddingBottom: spacing.xxl 
  },
  card: { 
    backgroundColor: colors.surface, 
    borderRadius: borderRadius.xl, 
    flexDirection: 'row', 
    marginBottom: spacing.lg, 
    padding: spacing.md, 
    ...shadows.medium,
  },
  imagen: { 
    width: 90, 
    height: 90, 
    borderRadius: borderRadius.md, 
    backgroundColor: colors.border 
  },
  infoContainer: { 
    flex: 1, 
    marginLeft: spacing.md, 
    justifyContent: 'space-between' 
  },
  nombre: { 
    fontSize: typography.fontSize.title, 
    fontWeight: typography.fontWeight.bold, 
    color: colors.textPrimary 
  },
  descripcion: { 
    fontSize: typography.fontSize.caption, 
    color: colors.textSecondary, 
    marginVertical: spacing.xs 
  },
  precio: { 
    fontSize: typography.fontSize.title, 
    fontWeight: typography.fontWeight.bold, 
    color: colors.secondary 
  },
  botonAgregar: { 
    backgroundColor: colors.primaryDark, 
    paddingVertical: spacing.xs + 2, 
    borderRadius: borderRadius.sm, 
    alignItems: 'center', 
    marginTop: 5 
  },
  textoBoton: { 
    color: colors.textLight, 
    fontWeight: typography.fontWeight.medium, 
    fontSize: typography.fontSize.small 
  },
  badgeOferta: {
    backgroundColor: colors.badgeBackground, 
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    marginTop: spacing.xs,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: colors.secondaryLight 
  },
  textoBadge: {
    color: colors.secondary, 
    fontSize: typography.fontSize.badge,
    fontWeight: typography.fontWeight.bold,
  },

  // ========================================================
  // 🔥 4. PANTALLA / SECCIÓN DE OFERTAS ESPECIALES
  // ========================================================
  cardOfertaEspecial: {
    backgroundColor: colors.surfaceAlt, 
    borderColor: colors.borderOffer,
    borderWidth: 1,
  },
  tagOfertaContraste: {
    backgroundColor: colors.danger, 
    paddingHorizontal: spacing.md - 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs,
    alignSelf: 'flex-start',
  },
  textoTagOferta: {
    color: colors.textLight,
    fontSize: typography.fontSize.badge,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.wide,
  },
  precioOferta: {
    fontSize: typography.fontSize.kpi,
    fontWeight: typography.fontWeight.bold,
    color: colors.danger,
    marginBottom: spacing.xs + 2,
  },
  botonAgregarOferta: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },

  // ========================================================
  // 🛒 5. PANTALLA DE CARRITO DE COMPRAS
  // ========================================================
  cardCarrito: { 
    backgroundColor: colors.surface, 
    padding: spacing.lg, 
    borderRadius: borderRadius.lg, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: spacing.sm + 2, 
    borderLeftWidth: 4, 
    borderLeftColor: colors.primaryDark 
  },
  controlesCantidad: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    borderRadius: borderRadius.pill, 
    padding: spacing.xs 
  },
  botonMenos: { 
    backgroundColor: colors.dangerLight, 
    width: 30, height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  botonMas: { 
    backgroundColor: colors.secondaryLight, 
    width: 30, height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  textoControl: { 
    color: colors.textLight, 
    fontSize: typography.fontSize.kpi, 
    fontWeight: typography.fontWeight.bold 
  },
  cantidadNumero: { 
    marginHorizontal: spacing.md, 
    fontSize: typography.fontSize.title, 
    fontWeight: typography.fontWeight.bold 
  },
  contenedorTotal: { 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
    backgroundColor: colors.surface, 
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl + insets.bottom, 
    borderTopWidth: 1, 
    borderTopColor: colors.border 
  },
  totalTexto: { 
    fontSize: typography.fontSize.kpi, 
    fontWeight: typography.fontWeight.bold, 
    textAlign: 'center', 
    marginBottom: spacing.sm + 2, 
    color: colors.textPrimary 
  },
  botonWhatsApp: { 
    backgroundColor: colors.whatsapp, 
    padding: spacing.md, 
    borderRadius: borderRadius.md, 
    alignItems: 'center' 
  },
  textoBotonWA: { 
    color: colors.textLight, 
    fontSize: typography.fontSize.title, 
    fontWeight: typography.fontWeight.bold 
  },

  // ========================================================
  // 📜 6. PANTALLA DE HISTORIAL DE PEDIDOS
  // ========================================================
  cardHistorial: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50', 
    ...shadows.light,
  },
  headerHistorial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  fechaHistorial: {
    fontSize: typography.fontSize.small,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  totalHistorial: {
    fontSize: typography.fontSize.subheading,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary,
  },
  textoItemHistorial: {
    fontSize: typography.fontSize.body,
    color: colors.textDarkAlt,
    marginVertical: 2,
  },

  // ========================================================
  // 📈 7. PANTALLA / PANEL DE ESTADÍSTICAS
  // ========================================================
  contenedorFiltrosEstadistica: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceFilter,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    marginBottom: spacing.xxl,
    justifyContent: 'space-between',
  },
  botonFiltroEstadistica: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  botonFiltroEstadisticaActivo: {
    backgroundColor: colors.primary,
  },
  textoFiltroEstadistica: {
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    color: colors.textFilter,
  },
  textoFiltroEstadisticaActivo: {
    color: colors.textLight,
  },
  filaKpiEstadistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  tarjetaKpiEstadistica: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '48%',
    ...shadows.light,
    alignItems: 'center',
  },
  tituloKpiEstadistica: {
    fontSize: typography.fontSize.caption,
    color: colors.textSubtle,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  valorKpiEstadistica: {
    fontSize: typography.fontSize.header,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary,
  },
  contenedorPodioEstadistica: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.light,
  },
  tituloSeccionEstadistica: {
    fontSize: typography.fontSize.subheading,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  filaItemPodioEstadistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderAlt,
  },
  nombreItemPodioEstadistica: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDarkAlt,
  },
  cantidadItemPodioEstadistica: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },    
});