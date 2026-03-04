import { StyleSheet } from 'react-native';
import { COLORS } from '../../Constants/constants';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSub: {
    fontSize: 13,
    color: COLORS.primaryLight,
    marginTop: 2,
  },
  searchContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  listContent: {
    padding: 16,
  },
  loader: {
    marginVertical: 20,
  },
  endText: {
    textAlign: 'center',
    color: COLORS.textGray,
    fontSize: 13,
    paddingVertical: 20,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textGray,
  },
});
