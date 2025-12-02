export interface Reparacion {
  id: number;
  vehiculo_patente?: string;
  descripcion?: string | null;
  fecha_inicio: string;
  fecha_fin?: string | null;
  activo: boolean;
  precio: string | number;
  repuesto_id?: number;
  vehiculo_id?: number;
  cliente_id?: number;
}


export interface ReparacionFormData {
  fecha_inicio: string;
  fecha_fin?: string | null;
  activo: boolean;
  precio: string | number;
  descripcion?: string | null;
  vehiculo_id: number;
  repuesto_id?: number;
  cliente_id?: number;
}