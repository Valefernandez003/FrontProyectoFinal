import type { Repuesto, RepuestoFormData } from "../types/Repuesto";
import { API_URL } from "./api";

export const repuestoService = {
  // Obtener todos los repuestos
getAll: async (): Promise<Repuesto[]> => {
  const res = await API_URL.get("/repuestos");
  const data = Array.isArray(res.data) ? res.data : res.data.repuestos;
  return data;
},

getAllIncludingInactive: async (): Promise<Repuesto[]> => {
  const res = await API_URL.get("/repuestos/all");
  return Array.isArray(res.data) ? res.data : res.data.repuestos;
},

  // Crear repuesto
  create: async (data: RepuestoFormData): Promise<Repuesto> => {
    const res = await API_URL.post<{ repuesto: Repuesto }>("/repuestos", data);
    return res.data.repuesto;
  },

  // Actualizar repuesto
  update: async (id: number, data: RepuestoFormData): Promise<Repuesto> => {
    const res = await API_URL.put<{ repuesto: Repuesto }>(`/repuestos/${id}`, data);
    return res.data.repuesto;
  },

  // Eliminar repuesto
  delete: async (id: number): Promise<void> => {
    await API_URL.delete(`/repuestos/${id}`);
  },
};
