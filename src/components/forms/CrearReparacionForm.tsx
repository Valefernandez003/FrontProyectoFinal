import styles from "../../styles/forms/CrearReparacionForm.module.css";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { useState, useEffect } from "react";
import { CrearVehiculoForm } from "./CrearVehiculoForm";
import { CrearRepuestoForm } from "./CrearRepuestoForm";
import { selectDarkStyles } from "../../styles/DarkStyles";
import { clienteService } from "../../services/clienteService";
import type { Cliente } from "../../types/Cliente";
import { vehiculoService } from "../../services/VehiculoService";
import { repuestoService } from "../../services/repuestoService";
import { reparacionService } from "../../services/reparacionService";

interface VehiculoOption {
  value: string;
  label: string;
}

interface RepuestoOption {
  value: string;
  label: string;
}

interface Props {
  onClose: () => void;
  onReparacionCreada?: () => void;
}

export const CrearReparacionForm: React.FC<Props> = ({ onClose, onReparacionCreada }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [vehiculos, setVehiculos] = useState<VehiculoOption[]>([]);
  const [repuestos, setRepuestos] = useState<RepuestoOption[]>([]);

  const [vehiculo, setVehiculo] = useState<VehiculoOption | null>(null);
  const [repuesto, setRepuesto] = useState<RepuestoOption | null>(null);

  const [showVehiculoForm, setShowVehiculoForm] = useState(false);
  const [showRepuestoForm, setShowRepuestoForm] = useState(false);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  // Carga inicial
  useEffect(() => {
    clienteService.getClientes().then(setClientes);

    vehiculoService.getVehiculos().then((data) => {
      const mapped = data.map((v: any) => ({
        value: v.id.toString(),
        label: `patente: ${v.patente}, auto: ${v.modelo}`,
      }));
      setVehiculos(mapped);
    });

    repuestoService.getAll().then((data) => {
      const mapped = data.map((r: any) => ({
        value: r.id.toString(),
        label: r.nombre,
      }));
      setRepuestos(mapped);
    });
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!vehiculo) {
    alert("Seleccione un vehículo");
    return;
  }

  if (!repuesto) {
    alert("Seleccione un repuesto (pieza)");
    return;
  }
  
  const payload = {
    repuesto_id: Number(repuesto.value),
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin || null,
    activo: true,
    precio: Number(precio),
    vehiculo_id: Number(vehiculo.value),
    descripcion: String(descripcion)
  };

  try {
    await reparacionService.create(payload);
    await repuestoService.delete(Number(repuesto.value));
    setRepuestos(prev =>
      prev.filter(r => r.value !== repuesto.value)
    );
    setRepuesto(null);
    if (onReparacionCreada) onReparacionCreada();
    onClose();
  } catch (err) {
    console.error("Error al crear reparación:", err);
    alert("Error al registrar reparación");
  }
};

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear Reparación</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Vehículo:
            <div className={styles.inlineGroup}>
              <div className={styles.reactSelectWrapper}>
                <Select
                  options={vehiculos}
                  value={vehiculo}
                  onChange={(newValue: SingleValue<VehiculoOption>) =>
                    setVehiculo(newValue)
                  }
                  placeholder="Buscar vehículo..."
                  isSearchable
                  styles={selectDarkStyles}
                />
              </div>
              <button
                type="button"
                className={styles.smallButton}
                onClick={() => setShowVehiculoForm(true)}
              >
                Agregar vehículo
              </button>
            </div>
          </label>

          <label>
            Repuesto:
            <div className={styles.inlineGroup}>
              <div className={styles.reactSelectWrapper}>
                <Select
                  options={repuestos}
                  value={repuesto}
                  onChange={(newValue: SingleValue<RepuestoOption>) =>
                    setRepuesto(newValue)
                  }
                  placeholder="Buscar repuesto..."
                  isSearchable
                  styles={selectDarkStyles}
                />
              </div>
              <button
                type="button"
                className={styles.smallButton}
                onClick={() => setShowRepuestoForm(true)}
              >
                Agregar repuesto
              </button>
            </div>
          </label>

          <label>
            Fecha inicio:
            <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
          </label>

          <label>
            Fecha fin:
            <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
          </label>

          <label>
            Descripción Pieza a cambiar:
            <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          </label>

          <label>
            Precio estimado:
            <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
          </label>

          <div className={styles.buttons}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>

      {showVehiculoForm && (
        <CrearVehiculoForm
          onClose={() => setShowVehiculoForm(false)}
          clientes={clientes}
          onVehiculoCreado={(nuevo) => {
            const opt = {
              value: nuevo.id.toString(),
              label: `${nuevo.marca} ${nuevo.modelo}`,
            };
            setVehiculos((prev) => [...prev, opt]);
            setVehiculo(opt);
            setShowVehiculoForm(false);
          }}
        />
      )}

      {showRepuestoForm && (
        <CrearRepuestoForm
          onClose={() => setShowRepuestoForm(false)}
          onRepuestoCreado={(nuevo) => {
            const opt = {
              value: nuevo.id.toString(),
              label: nuevo.nombre,
            };
            setRepuestos((prev) => [...prev, opt]);
            setRepuesto(opt);
            setShowRepuestoForm(false);
          }}
        />
      )}
    </div>
  );
};
