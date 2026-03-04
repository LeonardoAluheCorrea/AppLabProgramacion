import { StyleSheet } from 'react-native';
import { COLORS } from '../../Constants/constants';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    backgroundColor: COLORS.background,
    paddingBottom: 30,
  },
  // ─── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.primaryLight,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  // ─── Stats ────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: -16,
    marginBottom: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textGray,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 15,
  },
  // ─── About ────────────────────────────────────────────────────
  aboutCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 21,
    marginTop: 6,
  },
  // ─── Section title ────────────────────────────────────────────
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textDark,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  // ─── Actions ──────────────────────────────────────────────────
  actionsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionBtnAlt: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  actionEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 18,
  },
  // ─── Featured cards ───────────────────────────────────────────
  featuredCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  featuredLeft: {
    backgroundColor: COLORS.primaryPale,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredEmoji: {
    fontSize: 28,
  },
  featuredRight: {
    flex: 1,
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  featuredDesc: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
  featuredAlt: {
    fontSize: 11,
    color: COLORS.textMid,
    marginTop: 4,
    fontWeight: '600',
  },
});
