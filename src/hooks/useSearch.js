// src/hooks/useSearch.js
import { useState, useMemo } from 'react';

/**
 * Normaliza una cadena de texto eliminando tildes, diacríticos y caracteres especiales.
 * @param {string} text - Texto a normalizar.
 * @returns {string} Texto limpio en minúsculas y sin acentos.
 */
const normalizeText = (text = '') => {
  return String(text)
    .toLowerCase()
    .normalize('NFD') // Descompone caracteres combinados (ej: 'ó' -> 'o' + '´')
    .replace(/[\u0300-\u036f]/g, '') // Remueve los signos diacríticos (tildes)
    .trim();
};

/**
 * Custom Hook para filtrado de alta precisión y coincidencia estricta de términos.
 * @param {Array} dataList - Lista base de items (Productos u Ofertas).
 * @param {Array} searchKeys - Atributos sobre los cuales se aplicará el filtro.
 */
export const useSearch = (
  dataList = [],
  searchKeys = ['nombre', 'categoria']
) => {
  const [query, setQuery] = useState('');

  // ⚡ Optimización reactiva con useMemo para prevenir filtrados innecesarios
  const filteredData = useMemo(() => {
    const rawQuery = normalizeText(query);

    // Si la búsqueda está vacía o contiene solo espacios, retornamos toda la lista
    if (!rawQuery) return dataList;

    // Split por espacios para obtener palabras clave individuales ingresadas por el usuario
    const queryTokens = rawQuery.split(/\s+/);

    return dataList.filter((item) => {
      // 1. Concatenamos los campos relevantes especificados en searchKeys
      const itemSearchableContent = searchKeys
        .map((key) => normalizeText(item[key]))
        .join(' ');

      // 2. Coincidencia Estricta (Token Matching):
      // Cada una de las palabras buscadas DEBE estar presente en el contenido del item.
      // Si el usuario busca "Jabón Líquido", el ítem debe contener "jabón" Y TAMBIÉN "líquido".
      return queryTokens.every((token) => itemSearchableContent.includes(token));
    });
  }, [dataList, query, searchKeys]);

  // Helper para resetear la búsqueda
  const clearQuery = () => setQuery('');

  return {
    query,
    setQuery,
    clearQuery,
    filteredData,
  };
};