import type { Anuncio, AnuncioFormData } from "../types/Anuncio";
import { API_URL } from "./api";

export const anuncioService = {
  // Obtener anuncios
  async getAnuncios(mostrar?: "todo"): Promise<Anuncio[]> {
    const url = mostrar ? `/anuncios?mostrar=${mostrar}` : "/anuncios";
    const res = await API_URL.get<Anuncio[]>(url);
    return res.data;
  },

  // Crear anuncio
  async createAnuncio(data: AnuncioFormData): Promise<Anuncio> {
    const res = await API_URL.post<{ anuncio: Anuncio }>("/anuncios", data);
    return res.data.anuncio;
  },

  // Actualizar anuncio
  async updateAnuncio(id: number, data: AnuncioFormData): Promise<Anuncio> {
    const res = await API_URL.put<{ anuncio: Anuncio }>(`/anuncios/${id}`, data);
    return res.data.anuncio;
  },

  // Eliminar anuncio
  async deleteAnuncio(id: number): Promise<void> {
    await API_URL.delete(`/anuncios/${id}`);
  },
};
