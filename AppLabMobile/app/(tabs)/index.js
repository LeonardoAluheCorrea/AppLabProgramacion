import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';

// Update this if your IP changes
const API_URL = 'http://192.168.1.132:3000/api/refugios';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setData([...data, ...response.data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Connection Error. Is node app.js running?", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>ID: {item.id}</Text>
      </View>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>
      <Text style={styles.contact}>{item.contacto}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AppLab Refugios</Text>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadData}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#4A90E2" /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { 
    padding: 20, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E1E8EE',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  listContent: { padding: 15 },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    marginBottom: 15, 
    borderRadius: 12, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badge: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  badgeText: { color: '#0288D1', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#34495E' },
  description: { fontSize: 15, color: '#7F8C8D', marginTop: 8, lineHeight: 20 },
  contact: { fontSize: 13, color: '#4A90E2', marginTop: 12, fontWeight: '600' }
});