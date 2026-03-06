import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createRefugio } from '../../Services/refugios.service';
import styles from './FormStyles';

function FormField({ label, emoji, value, onChangeText, placeholder, multiline, keyboardType }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{emoji}  {label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType || 'default'}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    contacto: '',
    altitud: '',
    capacidad: '',
  });

  const set = (field) => (value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio.';
    if (!form.descripcion.trim()) return 'La descripción es obligatoria.';
    if (!form.contacto.trim()) return 'El contacto es obligatorio.';
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      Alert.alert('Campos incompletos', error);
      return;
    }

    setLoading(true);
    try {
      await createRefugio(form);
      Alert.alert(
        '¡Refugio creado! 🏠',
        `"${form.nombre}" fue agregado exitosamente.`,
        [{ text: 'Ver lista', onPress: () => router.push('/(tabs)/list') }]
      );
      setForm({ nombre: '', descripcion: '', contacto: '', altitud: '', capacidad: '' });
    } catch (e) {
      Alert.alert('Error', 'No se pudo crear el refugio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6A4F" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container}>

          {/* ── HEADER ───────────────────────────────────────────── */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Agregar Refugio</Text>
            <Text style={styles.headerSub}>Completá los datos del nuevo refugio</Text>
          </View>

          {/* ── FORM ─────────────────────────────────────────────── */}
          <View style={styles.formCard}>

            <FormField
              label="Nombre *"
              emoji="🏠"
              value={form.nombre}
              onChangeText={set('nombre')}
              placeholder="Ej: Refugio Cerro Chapelco"
            />

            <FormField
              label="Descripción *"
              emoji="📝"
              value={form.descripcion}
              onChangeText={set('descripcion')}
              placeholder="Describí el refugio, sus características, entorno, etc."
              multiline
            />

            <FormField
              label="Contacto *"
              emoji="✉️"
              value={form.contacto}
              onChangeText={set('contacto')}
              placeholder="email@ejemplo.com"
              keyboardType="email-address"
            />

            <FormField
              label="Altitud"
              emoji="⛰️"
              value={form.altitud}
              onChangeText={set('altitud')}
              placeholder="Ej: 2400 msnm"
            />

            <FormField
              label="Capacidad"
              emoji="👥"
              value={form.capacidad}
              onChangeText={set('capacidad')}
              placeholder="Ej: 20 personas"
            />

            <Text style={styles.required}>* Campos obligatorios</Text>

            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.submitText}>Guardar Refugio</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
