import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import styles from "../styles/Reparaciones.module.css";
import { useState, useEffect } from "react";
import { CrearReparacionForm } from "../components/forms/CrearReparacionForm";
import { EditarReparacionForm } from "../components/forms/EditarReparacionForm";
import { EliminarReparacionForm } from "../components/forms/EliminarReparacionForm";
import { ReparacionList } from "../components/list/ReparacionList";
import type { ReparacionFormData } from "../types/Reparacion";
import { reparacionService } from "../services/reparacionService";
import { vehiculoService } from "../services/VehiculoService";
import { repuestoService } from "../services/repuestoService";
import { clienteService } from "../services/clienteService";

export const Reparaciones: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [reparaciones, setReparaciones] = useState<any[]>([]);
  const [reparacionSeleccionada, setReparacionSeleccionada] = useState<any | null>(null);
  const [showEditar, setShowEditar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);

  const cargarReparaciones = async () => {
    try {
      const reparacionesData = await reparacionService.getAll();
      const vehiculos = await vehiculoService.getVehiculos();
      const clientes = await clienteService.getClientes();
      const repuestos = await repuestoService.getAll();

      const reparacionesConDatos = reparacionesData.map((r) => {
        const veh = vehiculos.find((v) => v.id === r.vehiculo_id);
        const cl = clientes.find((c) => c.id === veh?.cliente_id);
        const rep = repuestos.find((x) => x.id === r.repuesto_id);

        return {
          ...r,
          vehiculo_patente: veh ? veh.patente : "—",
          cliente_nombre: cl ? cl.nombre : "—",
          cliente_telefono: cl ? cl.telefono : "—",
          repuesto_nombre: rep ? rep.nombre : "Sin repuesto",
        };
      });

      setReparaciones(reparacionesConDatos);
    } catch (err) {
      console.error("Error cargando reparaciones:", err);
    }
  };

  useEffect(() => {
    cargarReparaciones();
  }, []);

  const finalizarReparacion = async (id: number) => {
    try {
      const rep = reparaciones.find((r) => r.id === id);
      if (!rep) return;

      const payload: ReparacionFormData = {
        fecha_inicio: rep.fecha_inicio,
        fecha_fin: rep.fecha_fin,
        activo: false,
        precio: rep.precio,
        descripcion: rep.descripcion,
        vehiculo_id: rep.vehiculo_id,
        cliente_id: rep.cliente_id,
      };

      await reparacionService.update(id, payload);
      await cargarReparaciones();
    } catch (err) {
      console.error("Error finalizando reparación:", err);
    }
  };

  const editarReparacion = (id: number) => {
    const rep = reparaciones.find((r) => r.id === id);
    if (!rep) return;
    setReparacionSeleccionada(rep);
    setShowEditar(true);
  };

  const eliminarReparacion = (id: number) => {
    const rep = reparaciones.find((r) => r.id === id);
    if (!rep) return;
    setReparacionSeleccionada(rep);
    setShowEliminar(true);
  };

  const confirmarEliminar = async () => {
    if (!reparacionSeleccionada) return;

    await reparacionService.delete(reparacionSeleccionada.id);
    setShowEliminar(false);
    setReparacionSeleccionada(null);
    cargarReparaciones();
  };

  return (
    <div>
      <Header />
      <Aside />

      <div className={styles.main}>
        <h1 className={styles.title}>Reparaciones</h1>

        <div className={styles.container}>
          <div className={styles.reparaciones}>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={() => setShowForm(true)}>
                Crear Reparación
              </button>
            </div>
          <div className={styles.cards}>
            <ReparacionList
              reparaciones={reparaciones.filter(r => r.activo)}
              onFinalizar={finalizarReparacion}
              onEliminar={eliminarReparacion}
              onEditar={editarReparacion}
            />
          </div>
          </div>
        </div>
      </div>

      {showForm && (
        <CrearReparacionForm
          onClose={() => setShowForm(false)}
          onReparacionCreada={cargarReparaciones}
        />
      )}

      {showEditar && reparacionSeleccionada && (
        <EditarReparacionForm
          reparacion={reparacionSeleccionada}
          onClose={() => {
            setShowEditar(false);
            setReparacionSeleccionada(null);
          }}
          onReparacionActualizada={cargarReparaciones}
        />
      )}

      {showEliminar && reparacionSeleccionada && (
        <EliminarReparacionForm
          reparacion={reparacionSeleccionada}
          onCancelar={() => {
            setShowEliminar(false);
            setReparacionSeleccionada(null);
          }}
          onConfirmar={confirmarEliminar}
        />
      )}
    </div>
  );
};
