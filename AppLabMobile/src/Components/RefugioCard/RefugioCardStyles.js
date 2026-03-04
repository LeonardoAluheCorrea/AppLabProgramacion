import { StyleSheet } from 'react-native';
import { COLORS } from '../../Constants/constants';

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: COLORS.primaryPale,
  },
  content: {
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  badge: {
    backgroundColor: COLORS.primaryPale,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  altBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  altText: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '600',
  },
  nombre: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 13,
    color: COLORS.textGray,
    lineHeight: 19,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contacto: {
    fontSize: 12,
    color: COLORS.textMid,
    fontWeight: '500',
    flex: 1,
  },
  verMas: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
