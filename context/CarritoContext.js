import React, { createContext, useState, useContext, useMemo } from 'react';
import OFERTAS_CONFIG from '../data/ofertas.json';
// 1. Inicializamos el contexto del carrito
const CarritoContext = createContext();

// 2. Proveedor que envolverá la aplicación y manejará los estados globales
export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [verCarrito, setVerCarrito] = useState(false); // Manejo de navegación simple/ligera

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

 //  AGREGAR ESTE NUEVO MOTOR DE CÁLCULO:
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

 return (
  <CarritoContext.Provider
    value={{
      carrito,
      agregarProducto,
      eliminarProducto,
      vaciarCarrito,
      precioTotal,
      cantidadTotal,
      detalleDescuentos, // 🌟 Pasamos los detalles de las ofertas activas
      verCarrito,
      setVerCarrito,
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