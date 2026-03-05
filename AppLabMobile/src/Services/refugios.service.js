import { API_BASE_URL, PAGE_SIZE } from '../Constants/constants';

// ─── GET lista (infinite scroll) ────────────────────────────────
export const getRefugios = async (page = 1) => {
  const response = await fetch(
    `${API_BASE_URL}/api/refugios?page=${page}&limit=${PAGE_SIZE}`
  );
  if (!response.ok) throw new Error('Error al cargar los refugios');
  return response.json();
};

// ─── GET refugio por ID ────────────────────────────────────────────────
export const getRefugioById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/refugios/${id}`);
  if (!response.ok) throw new Error('Refugio no encontrado');
  return response.json();
};

// ─── POST create refugio ─────────────────────────────────────────────────
export const createRefugio = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/refugios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear el refugio');
  return response.json();
};
