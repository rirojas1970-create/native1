import React, { createContext, useState, useContext } from 'react';
import productosIniciales from '../data/productos.json';
import ofertasIniciales from '../data/ofertas.json';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Estados inicializados con tus datos estáticos actuales
  const [productos, setProductos] = useState(productosIniciales);
  const [ofertas, setOfertas] = useState(ofertasIniciales);
  const [ventas, setVentas] = useState([
    {
      id: '1',
      fecha: '09/07/2026, 10:05 p. m.',
      detalles: [
        { nombre: 'Detergente Premium', cantidad: 2, precio: 2500 },
        { nombre: 'Limpiavidrios Pro', cantidad: 2, precio: 2100 },
        { nombre: 'Desinfectante Lavanda', cantidad: 1, precio: 1800 }
      ],
      total: 11000
    }
  ]);

  // --- ACCIONES DE GESTIÓN ---

  // Agregar o Editar Producto (Automatizado por ID)
  const guardarProducto = (producto) => {
    if (producto.id) {
      setProductos(prev => prev.map(p => p.id === producto.id ? producto : p));
    } else {
      const nuevoProducto = { ...producto, id: Date.now().toString() };
      setProductos(prev => [...prev, nuevoProducto]);
    }
  };

  // Crear Promo u Oferta Especial
  const guardarOferta = (oferta) => {
    const nuevaOferta = { ...oferta, id: Date.now().toString() };
    setOfertas(prev => [...prev, nuevaOferta]);
  };

  // Registrar una nueva venta (Se llamará desde el checkout del carrito)
  const registrarVenta = (nuevaCompra) => {
    setVentas(prev => [nuevaCompra, ...prev]);
  };

  return (
    <AdminContext.Provider value={{
      productos,
      ofertas,
      ventas,
      guardarProducto,
      guardarOferta,
      registrarVenta
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);