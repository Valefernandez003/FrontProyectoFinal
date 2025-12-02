import { useState, useEffect } from "react";
import { AutoCard } from "./AutoCard";
import styles from "../../styles/cards/VerAutosCard.module.css";
import { vehiculoService } from "../../services/VehiculoService";
import type { Reparacion } from "../../types/Reparacion";
import { EditarVehiculoForm } from "../forms/EditarVehiculoForm";
import { clienteService } from "../../services/clienteService";
import type { Cliente } from "../../types/Cliente";

interface Vehiculo {
  id: number;
  cliente_id: number;
  patente: string;
  modelo: string;
  anio: string;
  color?: string;
}

interface VerAutosCardProps {
  clienteNombre: string;
  autos: Vehiculo[];
  onClose: () => void;
}

export const VerAutosCard: React.FC<VerAutosCardProps> = ({
  clienteNombre,
  autos,
  onClose,
}) => {
  const [autosLocal, setAutosLocal] = useState(autos);
  const [expandedAutos, setExpandedAutos] = useState<Record<number, boolean>>({});
  const [reparaciones, setReparaciones] = useState<Record<number, Reparacion[]>>({});
  const [autoEditando, setAutoEditando] = useState<Vehiculo | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  // 🔹 CARGAR CLIENTES
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await clienteService.getClientes();
        setClientes(data);
      } catch {
        setClientes([]);
      }
    };
    fetchClientes();
  }, []);

  const toggleReparaciones = async (auto: Vehiculo) => {
    const isExpanded = !!expandedAutos[auto.id];

    if (!isExpanded && !reparaciones[auto.id]) {
      try {
        const data = await vehiculoService.getReparaciones(auto.id);
        setReparaciones(prev => ({ ...prev, [auto.id]: data }));
      } catch {
        setReparaciones(prev => ({ ...prev, [auto.id]: [] }));
      }
    }

    setExpandedAutos(prev => ({ ...prev, [auto.id]: !isExpanded }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Vehículos de {clienteNombre}</h2>

        {autosLocal.length === 0 ? (
          <p>Este cliente no tiene vehículos registrados.</p>
        ) : (
          <div className={styles.cards}>
            {autosLocal.filter(a => !!a).map(auto => (
              <div key={auto.id}>
                <AutoCard
                  id={auto.id}
                  modelo={auto.modelo}
                  patente={auto.patente}
                  anio={auto.anio}
                  color={auto.color ?? ""}
                  cliente_id={auto.cliente_id}
                  onClick={() => toggleReparaciones(auto)}
                  onEditarVehiculo={(vehiculo) => setAutoEditando(vehiculo)}
                />

                {expandedAutos[auto.id] && (
                  <div className={styles.reparacionesDesplegable}>
                    {reparaciones[auto.id]?.length === 0 ? (
                      <p>No hay reparaciones registradas.</p>
                    ) : (
                      <ul>
                        {reparaciones[auto.id].map(r => (
                          <li key={r.id} className={styles.reparacionItem}>
                            <p><strong>Descripción:</strong> {r.descripcion}</p>
                            <p><strong>Finalizado:</strong> {r.fecha_fin ? new Date(r.fecha_fin).toLocaleDateString() : "N/A"}</p>
                            <p><strong>Total:</strong> ${r.precio}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.buttons}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>

        {autoEditando && (
          <EditarVehiculoForm
            vehiculo={autoEditando}
            clientes={clientes}
            onClose={() => setAutoEditando(null)}
            onVehiculoEditado={(v) => {
              if (!v) return;

              setAutosLocal(prev =>
                prev.map(a => (a.id === v.id ? v : a))
              );

              setAutoEditando(null);
            }}
          />
        )}
    </div>
  );
};
