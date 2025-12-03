import type { Reparacion } from "../types/Reparacion";
import type { Vehiculo, VehiculoFormData } from "../types/Vehiculo";
import { API_URL } from "./api";

export const vehiculoService = {
  
  // Obtener todos los vehículos
  getVehiculos: async (): Promise<Vehiculo[]> => {
    try {
      const res = await API_URL.get("/vehiculos");
      const data = Array.isArray(res.data) ? res.data : res.data.vehiculos;
      return data;
    } catch (err: any) {
      console.error("Error al obtener vehículos:", err);
      throw new Error(
        err.response?.data?.error || "Error al obtener vehículos"
      );
    }
  },

  // Crear vehículo
  crearVehiculo: async (data: VehiculoFormData): Promise<Vehiculo> => {
    try {
      const res = await API_URL.post<Vehiculo>("/vehiculos", data);
      return res.data;
    } catch (err: any) {
      console.error("Error al crear vehículo:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al crear vehículo";
      throw new Error(msg);
    }
  },

  // Actualizar vehículo
  actualizarVehiculo: async (
    id: number,
    data: VehiculoFormData
  ): Promise<Vehiculo> => {
    try {
      const res = await API_URL.put<{ vehiculo: Vehiculo }>(
        `/vehiculos/${id}`,
        data
      );
      return res.data.vehiculo;
    } catch (err: any) {
      console.error("Error al actualizar vehículo:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al actualizar vehículo";
      throw new Error(msg);
    }
  },

  // Eliminar vehículo
  eliminarVehiculo: async (id: number): Promise<void> => {
    try {
      await API_URL.delete(`/vehiculos/${id}`);
    } catch (err: any) {
      console.error("Error al eliminar vehículo:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al eliminar vehículo";
      throw new Error(msg);
    }
  },
  
// Obtener reparaciones de un vehículo
getReparaciones: async (vehiculoId: number): Promise<Reparacion[]> => {
  try {
    const res = await API_URL.get(`/vehiculos/${vehiculoId}/reparaciones`);

    return res.data;
  } catch (err: any) {
    console.error("Error al obtener reparaciones:", err);
    return [];
  }
},

};

