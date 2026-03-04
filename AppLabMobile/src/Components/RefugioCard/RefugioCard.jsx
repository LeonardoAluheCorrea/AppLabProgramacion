import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './RefugioCardStyles';

export default function RefugioCard({ refugio, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: refugio.img || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>#{refugio.id}</Text>
          </View>
          {refugio.altitud && (
            <View style={styles.altBadge}>
              <Text style={styles.altText}>⛰ {refugio.altitud}</Text>
            </View>
          )}
        </View>
        <Text style={styles.nombre} numberOfLines={1}>{refugio.nombre}</Text>
        <Text style={styles.descripcion} numberOfLines={2}>{refugio.descripcion}</Text>
        <View style={styles.footer}>
          <Text style={styles.contacto}>✉ {refugio.contacto}</Text>
          <Text style={styles.verMas}>Ver más →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
