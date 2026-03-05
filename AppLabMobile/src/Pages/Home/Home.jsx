import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, SafeAreaView, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getRefugios } from '../../Services/refugios.service';
import styles from './HomeStyles';

export default function Home() {
  const router = useRouter();
  const [totalRefugios, setTotalRefugios] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getRefugios(1);
        setFeatured(data.slice(0, 3));
        setTotalRefugios(50);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6A4F" />
      <ScrollView contentContainerStyle={styles.container}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>⛰️</Text>
          <Text style={styles.headerTitle}>Refugios de Montaña</Text>
          <Text style={styles.headerSubtitle}>
            Tu guía para la alta montaña y las grandes cumbres
          </Text>
        </View>

        {/* ── STATS ──────────────────────────────────────────────── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {loading ? '...' : totalRefugios}
            </Text>
            <Text style={styles.statLabel}>Refugios{'\n'}disponibles</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>🏔️</Text>
            <Text style={styles.statLabel}>Alta{'\n'}montaña</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>🥾</Text>
            <Text style={styles.statLabel}>Rutas de{'\n'}senderismo</Text>
          </View>
        </View>

        {/* ── ABOUT ──────────────────────────────────────────────── */}
        <View style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>¿Qué es un refugio?</Text>
          <Text style={styles.aboutText}>
            Los refugios de montaña son instalaciones ubicadas en zonas de alta
            montaña, pensadas para brindar alojamiento y descanso a excursionistas
            y montañistas durante sus travesías. Ofrecen camas, cocina compartida
            y un lugar seguro ante condiciones climáticas adversas.
          </Text>
        </View>

        {/* ── QUICK ACTIONS ──────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Acciones rápidas</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/(tabs)/list')}
          >
            <Text style={styles.actionEmoji}>📋</Text>
            <Text style={styles.actionLabel}>Ver todos{'\n'}los refugios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnAlt]}
            onPress={() => router.push('/(tabs)/add')}
          >
            <Text style={styles.actionEmoji}>➕</Text>
            <Text style={styles.actionLabel}>Agregar{'\n'}refugio</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Destacados</Text>
        {loading ? (
          <ActivityIndicator color="#2D6A4F" style={{ marginTop: 20 }} />
        ) : (
          featured.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={styles.featuredCard}
              onPress={() => router.push(`/detail/${r.id}`)}
            >
              <View style={styles.featuredLeft}>
                <Text style={styles.featuredEmoji}>🏠</Text>
              </View>
              <View style={styles.featuredRight}>
                <Text style={styles.featuredName}>{r.nombre}</Text>
                <Text style={styles.featuredDesc} numberOfLines={1}>
                  {r.descripcion}
                </Text>
                {r.altitud && (
                  <Text style={styles.featuredAlt}>⛰ {r.altitud}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
