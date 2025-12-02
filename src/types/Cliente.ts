export interface Cliente {
  id: number;
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface ClienteFormData {
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
}
