import React, { useState, useEffect } from 'react';
import {
  FlatList, View, Text, ActivityIndicator,
  SafeAreaView, StatusBar, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import RefugioCard from '../../Components/RefugioCard/RefugioCard';
import { getRefugios } from '../../Services/refugios.service';
import styles from './ListStyles';

export default function List() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newItems = await getRefugios(page);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (e) {
      console.error('Error loading refugios:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMore(); }, []);

  const filtered = search.trim()
    ? data.filter(r =>
        r.nombre.toLowerCase().includes(search.toLowerCase()) ||
        r.descripcion.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6A4F" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Refugios</Text>
        <Text style={styles.headerSub}>{data.length} refugios cargados</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Buscar refugio..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RefugioCard
            refugio={item}
            onPress={() => router.push(`/detail/${item.id}`)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          loading
            ? <ActivityIndicator size="large" color="#2D6A4F" style={styles.loader} />
            : !hasMore
              ? <Text style={styles.endText}>— Todos los refugios cargados —</Text>
              : null
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🏔️</Text>
              <Text style={styles.emptyText}>No se encontraron refugios</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
