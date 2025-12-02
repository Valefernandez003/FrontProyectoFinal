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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface VehiculoOption {
  value: string;
  label: string;
  patente?: string;
}

interface RepuestoOption {
  value: string;
  label: string;
}

interface Props {
  onClose: () => void;
  onReparacionCreada?: () => void;
}

const validationSchema = Yup.object().shape({
  vehiculo: Yup.object().required("Seleccione un vehículo"),
  repuesto: Yup.object().required("Seleccione un repuesto"),
  fechaInicio: Yup.string().required("Ingrese la fecha de inicio"),
  fechaFin: Yup.string().nullable(),
  descripcion: Yup.string().required("Ingrese la descripción"),
  precio: Yup.number().typeError("Ingrese un número válido").required("Ingrese el precio"),
});

export const CrearReparacionForm: React.FC<Props> = ({ onClose, onReparacionCreada }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [vehiculos, setVehiculos] = useState<VehiculoOption[]>([]);
  const [repuestos, setRepuestos] = useState<RepuestoOption[]>([]);
  const [nuevoVehiculoSeleccionado, setNuevoVehiculoSeleccionado] = useState<VehiculoOption | null>(null);
  const [nuevoRepuestoSeleccionado, setNuevoRepuestoSeleccionado] = useState<RepuestoOption | null>(null);
  const [showVehiculoForm, setShowVehiculoForm] = useState(false);
  const [showRepuestoForm, setShowRepuestoForm] = useState(false);

  useEffect(() => {
    clienteService.getClientes().then(setClientes);
    vehiculoService.getVehiculos().then((data) => {
      const mapped = data.map((v: any) => ({
        value: v.id.toString(),
        label: `Patente: ${v.patente}, Auto: ${v.modelo}`,
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

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear Reparación</h2>

        <Formik
          initialValues={{
            vehiculo: null as VehiculoOption | null,
            repuesto: null as RepuestoOption | null,
            fechaInicio: "",
            fechaFin: "",
            descripcion: "",
            precio: "",
            patente: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const payload = {
                repuesto_id: Number(values.repuesto!.value),
                fecha_inicio: values.fechaInicio,
                fecha_fin: values.fechaFin || null,
                activo: true,
                precio: Number(values.precio),
                vehiculo_id: Number(values.vehiculo!.value),
                descripcion: values.descripcion,
              };
              await reparacionService.create(payload);
              await repuestoService.delete(Number(values.repuesto!.value));
              setRepuestos((prev) => prev.filter((r) => r.value !== values.repuesto!.value));
              if (onReparacionCreada) onReparacionCreada();
              onClose();
            } catch (err) {
              console.error("Error al crear reparación:", err);
              alert("Error al registrar reparación");
            }
          }}
        >
          {({ values, setFieldValue }) => {
            useEffect(() => {
              if (nuevoVehiculoSeleccionado) {
                setFieldValue("vehiculo", nuevoVehiculoSeleccionado);
                setNuevoVehiculoSeleccionado(null);
              }
            }, [nuevoVehiculoSeleccionado, setFieldValue]);

            useEffect(() => {
              if (nuevoRepuestoSeleccionado) {
                setFieldValue("repuesto", nuevoRepuestoSeleccionado);
                setNuevoRepuestoSeleccionado(null);
              }
            }, [nuevoRepuestoSeleccionado, setFieldValue]);

            return (
              <Form className={styles.form}>
                <label>
                  Vehículo:
                  <div className={styles.inlineGroup}>
                    <div className={styles.reactSelectWrapper}>
                      <Select
                        options={vehiculos}
                        value={values.vehiculo}
                        onChange={(newValue: SingleValue<VehiculoOption>) =>
                          setFieldValue("vehiculo", newValue)
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
                  <ErrorMessage name="vehiculo" component="div" className={styles.error} />
                </label>

                <label>
                  Repuesto:
                  <div className={styles.inlineGroup}>
                    <div className={styles.reactSelectWrapper}>
                      <Select
                        options={repuestos}
                        value={values.repuesto}
                        onChange={(newValue: SingleValue<RepuestoOption>) =>
                          setFieldValue("repuesto", newValue)
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
                  <ErrorMessage name="repuesto" component="div" className={styles.error} />
                </label>

                <label>
                  Fecha inicio:
                  <Field type="date" name="fechaInicio" />
                  <ErrorMessage name="fechaInicio" component="div" className={styles.error} />
                </label>

                <label>
                  Fecha fin:
                  <Field type="date" name="fechaFin" />
                </label>

                <label>
                  Descripción Pieza a cambiar:
                  <Field type="text" name="descripcion" />
                  <ErrorMessage name="descripcion" component="div" className={styles.error} />
                </label>

                <label>
                  Precio estimado:
                  <Field type="number" name="precio" />
                  <ErrorMessage name="precio" component="div" className={styles.error} />
                </label>

                <div className={styles.buttons}>
                  <button type="button" onClick={onClose}>Cancelar</button>
                  <button type="submit">Guardar</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      {showVehiculoForm && (
        <CrearVehiculoForm
          onClose={() => setShowVehiculoForm(false)}
          clientes={clientes}
          onVehiculoCreado={(nuevo) => {
            const opt = {
              value: nuevo.id.toString(),
              label: `Patente: ${nuevo.patente}, Modelo: ${nuevo.modelo}`,
              patente: nuevo.patente,
            };
            setVehiculos((prev) => [...prev, opt]);
            setNuevoVehiculoSeleccionado(opt); 
            setShowVehiculoForm(false);
          }}
        />
      )}

      {showRepuestoForm && (
        <CrearRepuestoForm
          onClose={() => setShowRepuestoForm(false)}
          onRepuestoCreado={(nuevo) => {
            const opt = { value: nuevo.id.toString(), label: nuevo.nombre };
            setRepuestos((prev) => [...prev, opt]);
            setNuevoRepuestoSeleccionado(opt);
            setShowRepuestoForm(false);
          }}
        />
      )}
    </div>
  );
};
