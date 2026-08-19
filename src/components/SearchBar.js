// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

export const SearchBar = ({ value, onChangeText, placeholder = "Buscar...", onClear }) => {
  return (
    <View style={localStyles.container}>
      {/* 🔍 Campo de entrada de texto */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={localStyles.input}
        returnKeyType="search"
        clearButtonMode="while-editing" // En iOS muestra el botón nativo de limpiar
      />
      
      {/* ❌ Botón para limpiar el texto (útil especialmente en Android/Web) */}
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={localStyles.clearButton}>
          <Text style={localStyles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// 💅 Estilos locales del buscador desacoplados
const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.lg + 10,
    padding: spacing.xs,
  },
  clearText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
  },
});