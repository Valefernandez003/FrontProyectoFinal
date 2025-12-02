export interface Vehiculo {
  id: number;
  patente: string;
  modelo: string;
  anio: number;
  color: string;
  cliente_id: number;
}

export interface VehiculoFormData {
  patente: string;
  modelo: string;
  anio: number;
  color: string;
  cliente_id: number;
}