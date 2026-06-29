import React, { createContext, useState, useContext, useMemo } from 'react';

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

  // Optimización de rendimiento mediante useMemo:
  // Solo recalcula los totales si los artículos del carrito cambian
  const { precioTotal, cantidadTotal } = useMemo(() => {
    const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    return { precioTotal: totalPrecio, cantidadTotal: totalCantidad };
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