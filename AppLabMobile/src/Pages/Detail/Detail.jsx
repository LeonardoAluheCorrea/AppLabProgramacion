import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Image, ActivityIndicator,
  SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getRefugioById } from '../../Services/refugios.service';
import styles from './DetailStyles';

function InfoRow({ emoji, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoEmoji}>{emoji}</Text>
      <View style={styles.infoTexts}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function Detail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [refugio, setRefugio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getRefugioById(id);
        setRefugio(data);
      } catch (e) {
        setError('No se pudo cargar el refugio.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2D6A4F" />
        <Text style={styles.loadingText}>Cargando refugio...</Text>
      </SafeAreaView>
    );
  }

  if (error || !refugio) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6A4F" />
      <ScrollView contentContainerStyle={styles.container}>

        {/* ── HERO IMAGE ─────────────────────────────────────────── */}
        <Image
          source={{ uri: refugio.img || 'https://via.placeholder.com/400x200' }}
          style={styles.heroImage}
        />

        {/* ── BACK BUTTON ────────────────────────────────────────── */}
        <TouchableOpacity style={styles.floatingBack} onPress={() => router.back()}>
          <Text style={styles.floatingBackText}>←</Text>
        </TouchableOpacity>

        {/* ── MAIN CARD ──────────────────────────────────────────── */}
        <View style={styles.mainCard}>
          <View style={styles.idBadge}>
            <Text style={styles.idBadgeText}>Refugio #{refugio.id}</Text>
          </View>
          <Text style={styles.nombre}>{refugio.nombre}</Text>
          <Text style={styles.descripcion}>{refugio.descripcion}</Text>
        </View>

        {/* ── INFO ROWS ──────────────────────────────────────────── */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Información</Text>
          <InfoRow emoji="✉️" label="Contacto" value={refugio.contacto} />
          {refugio.altitud && (
            <InfoRow emoji="⛰️" label="Altitud" value={refugio.altitud} />
          )}
          {refugio.capacidad && (
            <InfoRow emoji="👥" label="Capacidad" value={refugio.capacidad} />
          )}
        </View>

        {/* ── GALLERY ────────────────────────────────────────────── */}
        {(refugio.img2 || refugio.img3) && (
          <View style={styles.galleryCard}>
            <Text style={styles.infoCardTitle}>Galería</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[refugio.img, refugio.img2, refugio.img3].filter(Boolean).map((uri, i) => (
                <Image key={i} source={{ uri }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
