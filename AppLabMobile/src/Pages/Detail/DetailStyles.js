import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../Constants/constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  container: {
    paddingBottom: 30,
  },
  // ─── Hero ─────────────────────────────────────────────────────
  heroImage: {
    width: '100%',
    height: 240,
    backgroundColor: COLORS.primaryPale,
  },
  floatingBack: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  // ─── Main card ────────────────────────────────────────────────
  mainCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  idBadge: {
    backgroundColor: COLORS.primaryPale,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  idBadgeText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  nombre: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 22,
  },
  // ─── Info card ────────────────────────────────────────────────
  infoCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoEmoji: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  infoTexts: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: COLORS.textGray,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 2,
    fontWeight: '500',
  },
  // ─── Gallery ──────────────────────────────────────────────────
  galleryCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  galleryImage: {
    width: width * 0.55,
    height: 130,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: COLORS.primaryPale,
  },
  // ─── Error / Loading ──────────────────────────────────────────
  loadingText: {
    marginTop: 14,
    color: COLORS.textGray,
    fontSize: 14,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 15,
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
