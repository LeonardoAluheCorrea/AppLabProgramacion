import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList, View, Text, ActivityIndicator,
  SafeAreaView, StatusBar, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import RefugioCard from '../../Components/RefugioCard/RefugioCard';
import { getRefugios } from '../../Services/refugios.service';
import styles from './ListStyles';
import { PAGE_SIZE } from '../../Constants/constants';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function List() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const isLoadingRef = useRef(false);
  const pageRef = useRef(1);

  const loadMore = async () => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;
    setLoading(true);
    try {
      const newItems = await getRefugios(pageRef.current);  // ← usa ref
      if (newItems.length > 0) {
        setData(prev => [...prev, ...newItems]);
        pageRef.current = pageRef.current + 1;  // ← actualiza ref
        setPage(pageRef.current);               // ← actualiza estado para UI
      }
      if (newItems.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (e) {
      console.error('Error loading refugios:', e);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  };

  useFocusEffect(
  useCallback(() => {
    setData([]);
    setPage(1);
    pageRef.current = 1;       // ← resetea el ref
    setHasMore(true);
    isLoadingRef.current = false;
    loadMore();                // ← sin argumento ahora
  }, [])
);

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
