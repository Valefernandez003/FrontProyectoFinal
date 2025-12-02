import styles from "../../styles/forms/EditarReparacionForm.module.css";
import { useState, useEffect } from "react";
import { selectDarkStyles } from "../../styles/DarkStyles";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { vehiculoService } from "../../services/VehiculoService";
import { reparacionService } from "../../services/reparacionService";

interface VehiculoOption {
  value: string;
  label: string;
}

interface Props {
  reparacion: any;
  onClose: () => void;
  onReparacionActualizada?: () => void;
}

export const EditarReparacionForm: React.FC<Props> = ({
  reparacion,
  onClose,
  onReparacionActualizada,
}) => {
  const [vehiculos, setVehiculos] = useState<VehiculoOption[]>([]);

  const [vehiculo, setVehiculo] = useState<VehiculoOption | null>(null);
  const formatearFecha = (f: string) =>
      f ? f.split("T")[0] : "";

  const [fechaInicio, setFechaInicio] = useState(formatearFecha(reparacion.fecha_inicio));
  const [fechaFin, setFechaFin] = useState(formatearFecha(reparacion.fecha_fin));
  const [descripcion, setDescripcion] = useState(reparacion.descripcion || "");
  const [precio, setPrecio] = useState(reparacion.precio?.toString() || "");

// Cargar datos iniciales
useEffect(() => {

  vehiculoService.getVehiculos().then((data) => {
    const mapped = data.map((v: any) => ({
      value: v.id.toString(),
      label: `patente: ${v.patente}, auto: ${v.modelo}`,
    }));
    setVehiculos(mapped);

    const actual = mapped.find((v) => Number(v.value) === reparacion.vehiculo_id);
    setVehiculo(actual || null);
  });
}, [reparacion]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehiculo) {
      alert("Seleccione un vehículo");
      return;
    }

    const payload = {
      vehiculo_id: Number(vehiculo.value),
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin || null,
      precio: Number(precio),
      descripcion: descripcion,
      activo: reparacion.activo,
    };

    try {
      await reparacionService.update(reparacion.id, payload);

      if (onReparacionActualizada) onReparacionActualizada();
      onClose();
    } catch (err) {
      console.error("Error al actualizar reparación:", err);
      alert("Error al actualizar la reparación");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Reparación</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Vehículo:
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
          </label>

          <label>
            Fecha inicio:
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </label>

          <label>
            Fecha fin:
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </label>

          <label>
            Descripción pieza a cambiar:
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>

          <label>
            Precio estimado:
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </label>

          <div className={styles.buttons}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};
