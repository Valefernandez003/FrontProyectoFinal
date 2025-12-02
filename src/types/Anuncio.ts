export interface Anuncio {
  id: number;
  titulo: string;
  descripcion: string ;
  fecha_vencimiento: string ;
  prioridad: number;
  vehiculo_id: number | null;
  vehiculo_patente?: string | null;
}

export interface AnuncioFormData {
  titulo: string;
  descripcion?: string ;
  fecha_vencimiento?: string ;
  prioridad?: number;
  vehiculo_id?: number | null;
}
