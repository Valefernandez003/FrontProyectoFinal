import type { Cliente, ClienteFormData } from "../types/Cliente";
import { API_URL } from "./api";

export const clienteService = {
  // Obtener todos los clientes
  getClientes: async (): Promise<Cliente[]> => {
    try {
      const res = await API_URL.get<Cliente[]>("/clientes");
      return res.data;
    } catch (err: any) {
      console.error("Error al obtener clientes:", err);
      throw new Error(err.response?.data?.error || "Error al obtener clientes");
    }
  },

  // Crear cliente
  crearCliente: async (data: ClienteFormData): Promise<Cliente> => {
    try {
      const res = await API_URL.post<{ cliente: Cliente }>("/clientes", data);
      return res.data.cliente;
    } catch (err: any) {
      console.error("Error al crear cliente:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al crear cliente";
      throw new Error(msg);
    }
  },

  // Actualizar cliente
  actualizarCliente: async (id: number, data: ClienteFormData): Promise<Cliente> => {
    try {
      const res = await API_URL.put<{ cliente: Cliente }>(`/clientes/${id}`, data);
      return res.data.cliente;
    } catch (err: any) {
      console.error("Error al actualizar cliente:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al actualizar cliente";
      throw new Error(msg);
    }
  },

  // Eliminar cliente
  eliminarCliente: async (id: number): Promise<void> => {
    try {
      await API_URL.delete(`/clientes/${id}`);
    } catch (err: any) {
      console.error("Error al eliminar cliente:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al eliminar cliente";
      throw new Error(msg);
    }
  },
};
