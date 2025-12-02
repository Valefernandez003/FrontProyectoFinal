import type { Reparacion, ReparacionFormData } from "../types/Reparacion";
import { API_URL } from "./api";

export const reparacionService = {
  getAll: async (): Promise<Reparacion[]> => {
    const res = await API_URL.get<Reparacion[]>("/reparaciones");
    return res.data;
  },

  create: async (data: ReparacionFormData): Promise<Reparacion> => {
    const res = await API_URL.post<{ reparacion: Reparacion }>("/reparaciones", data);
    return res.data.reparacion;
  },

  update: async (id: number, data: ReparacionFormData): Promise<Reparacion> => {
    const res = await API_URL.put<{ reparacion: Reparacion }>(`/reparaciones/${id}`, data);
    return res.data.reparacion;
  },

  delete: async (id: number): Promise<void> => {
    await API_URL.delete(`/reparaciones/${id}`);
  },
};
