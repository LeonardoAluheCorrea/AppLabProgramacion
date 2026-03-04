import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

// IMPORTANT: Use your PC's IP address (e.g. 192.168.1.5), NOT 'localhost'
const API_URL = 'http://YOUR_COMPUTER_IP:3000/api/data'; 

export default function ListScreen() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setItems([...items, ...response.data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={fetchItems} // THIS TRIGGERS THE INFINITE SCROLL
        onEndReachedThreshold={0.5} 
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  itemBox: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText: { fontSize: 18 }
});