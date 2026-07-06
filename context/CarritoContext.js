import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OFERTAS_CONFIG from '../data/ofertas.json';

// 1. Inicializamos el contexto del carrito
const CarritoContext = createContext();

// 2. Proveedor que envolverá la aplicación y manejará los estados globales
export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [verCarrito, setVerCarrito] = useState(false); // Manejo de navegación simple/ligera
  const [historial, setHistorial] = useState([]); // Estado global para almacenar las compras pasadas
  const [filtroEstadistica, setFiltroEstadistica] = useState('trimestre'); // 🌟 Controla el rango de analíticas ('mes', 'bimestre', 'trimestre', 'semestre')

  // Carga el historial del teléfono de manera asíncrona apenas se inicia la app
  useEffect(() => {
    const cargarHistorialLocal = async () => {
      try {
        const historialGuardado = await AsyncStorage.getItem('@historial_pedidos');
        if (historialGuardado !== null) {
          setHistorial(JSON.parse(historialGuardado));
        }
      } catch (e) {
        console.error("Error al cargar el historial desde AsyncStorage:", e);
      }
    };

    cargarHistorialLocal();
  }, []);

  // Agrega un producto o incrementa su cantidad si ya existe
  const agregarProducto = (producto) => {
    setCarrito((itemsActuales) => {
      const existe = itemsActuales.find((item) => item.id === producto.id);
      if (existe) {
        return itemsActuales.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...itemsActuales, { ...producto, cantidad: 1 }];
    });
  };

  // Decrementa la cantidad o elimina el producto por completo si llega a 0
  const eliminarProducto = (id) => {
    setCarrito((itemsActuales) => {
      const existe = itemsActuales.find((item) => item.id === id);
      if (!existe) return itemsActuales;
      
      if (existe.cantidad === 1) {
        return itemsActuales.filter((item) => item.id !== id);
      }
      return itemsActuales.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      );
    });
  };

  // Limpia el estado tras finalizar la orden de compra
  const vaciarCarrito = () => setCarrito([]);

  // Motor de cálculo memorizado para rendimiento óptimo
  const { precioTotal, cantidadTotal, detalleDescuentos } = useMemo(() => {
    let totalPrecio = 0;
    let totalCantidad = 0;
    let descuentosAplicados = [];

    carrito.forEach((item) => {
      totalCantidad += item.cantidad;
      
      let precioUnitarioFinal = item.precio;
      let tieneDescuento = false;
      let promoDescripcion = "";

      // Buscamos si este producto tiene una regla asignada en ofertas.json
      const regla = OFERTAS_CONFIG.find(o => o.productoIds.includes(item.id));

      if (regla) {
        if (regla.tipo === 'por_cantidad' && item.cantidad >= regla.cantidadMinima) {
          const descuentoUnidad = (item.precio * regla.descuentoPorcentaje) / 100;
          precioUnitarioFinal = item.precio - descuentoUnidad;
          tieneDescuento = true;
          promoDescripcion = regla.descripcion;
        }
      }

      // Calculamos el subtotal de este producto aplicando o no el descuento
      const subtotalItem = precioUnitarioFinal * item.cantidad;
      totalPrecio += subtotalItem;

      // Si aplicó oferta, guardamos el registro del ahorro para informar al usuario y proveedor
      if (tieneDescuento) {
        const ahorroTotalItem = (item.precio - precioUnitarioFinal) * item.cantidad;
        descuentosAplicados.push({
          productoId: item.id,
          nombre: item.nombre,
          ahorro: ahorroTotalItem,
          descripcion: promoDescripcion
        });
      }
    });

    return { 
      precioTotal: totalPrecio, 
      cantidadTotal: totalCantidad, 
      detalleDescuentos: descuentosAplicados 
    };
  }, [carrito]);

  // Almacena la compra actual con fecha, hora, items y total neto
  const registrarCompraEnHistorial = async () => {
    if (carrito.length === 0) return;

    try {
      const ahora = new Date();
      const fechaFormateada = ahora.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const nuevoPedido = {
        id: ahora.getTime().toString(), // ID único basado en timestamp
        fecha: fechaFormateada,
        items: carrito.map(item => ({
          id: item.id, // Importante mantener la trazabilidad por ID para las métricas de consumo
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio
        })),
        total: precioTotal
      };

      const nuevoHistorial = [nuevoPedido, ...historial];
      setHistorial(nuevoHistorial);

      await AsyncStorage.setItem('@historial_pedidos', JSON.stringify(nuevoHistorial));
    } catch (e) {
      console.error("Error al persistir la compra en el historial local:", e);
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        precioTotal,
        cantidadTotal,
        detalleDescuentos,
        verCarrito,
        setVerCarrito,
        historial,
        registrarCompraEnHistorial,
        filtroEstadistica,     // 🌟 Expuesto para cambiar los rangos temporales desde la UI
        setFiltroEstadistica   // 🌟 Mutador expuesto para sincronizar el estado reactivamente
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

// 3. Hook personalizado para consumir el contexto de forma segura y directa
export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider');
  }
  return context;
}