export interface Repuesto {
  id: number;
  nombre: string;
  costo: number;
  cantidad: number;
}

export interface RepuestoFormData {
  nombre: string;
  costo: number;
  cantidad?: number;
}
