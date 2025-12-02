import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import styles from "../styles/Clientes.module.css";
import { useState, useEffect } from "react";
import { CrearClienteForm } from "../components/forms/CrearClienteForm";
import { EditarClienteForm } from "../components/forms/EditarClienteForm";
import { clienteService } from "../services/clienteService";
import { vehiculoService } from "../services/VehiculoService";
import { ClienteList } from "../components/list/ClienteList";
import { VerAutosCard } from "../components/cards/VerAutosCard";

// Cliente con email obligatorio
export interface Cliente {
  id: number;
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
}

interface Vehiculo {
  id: number;
  cliente_id: number;
  patente: string;
  modelo: string;
  anio: string;
}

export const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editarFormCliente, setEditarFormCliente] = useState<Cliente | null>(null);
  const [autos, setAutos] = useState<Vehiculo[]>([]);
  const [modalCliente, setModalCliente] = useState<Cliente | null>(null);
  const [search, setSearch] = useState("");

  const cargarClientes = async () => {
    try {
      const data = await clienteService.getClientes();
      // Forzar que email nunca sea undefined
      const clientesConEmail: Cliente[] = data.map((c: any) => ({
        ...c,
        email: c.email ?? "",
      }));
      setClientes(clientesConEmail);
    } catch (err) {
      console.error("Error cargando clientes:", err);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const verAutos = async (cliente: Cliente) => {
    try {
      const allVehiculos = await vehiculoService.getVehiculos();
      const vehiculosCliente = allVehiculos
        .filter((v) => v.cliente_id === cliente.id)
        .map((v) => ({ ...v, anio: String(v.anio) }));
      setAutos(vehiculosCliente);
      setModalCliente(cliente);
    } catch (err) {
      console.error("Error cargando vehículos:", err);
    }
  };

  const handleVerAutos = (cliente: Cliente) => {
    verAutos(cliente);
  };

  const cerrarModal = () => {
    setAutos([]);
    setModalCliente(null);
  };

  const editarCliente = (cliente: Cliente) => {
    setEditarFormCliente(cliente);
  };

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Aside />

      <div className={styles.main}>
        <h1 className={styles.title}>Clientes</h1>
        <div className={styles.container}>
          <div className={styles.reparaciones}>
            <div className={styles.buttonContainer}>
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              <button
                className={styles.button}
                onClick={() => setShowForm(true)}
              >
                Agregar Cliente
              </button>
            </div>

            {clientesFiltrados.length === 0 ? (
              <p className={styles.message}>No hay Clientes registrados</p>
            ) : (
              <ClienteList
                clientes={clientesFiltrados}
                onEditar={editarCliente}
                onVerAutos={handleVerAutos}
              />
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <CrearClienteForm
          onClose={() => {
            setShowForm(false);
            cargarClientes();
          }}
        />
      )}

      {editarFormCliente && (
        <EditarClienteForm
          cliente={editarFormCliente}
          onClose={() => {
            setEditarFormCliente(null);
            cargarClientes();
          }}
          onUpdated={cargarClientes}
        />
      )}

      {modalCliente && (
        <VerAutosCard
          clienteNombre={modalCliente.nombre}
          autos={autos}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
};
