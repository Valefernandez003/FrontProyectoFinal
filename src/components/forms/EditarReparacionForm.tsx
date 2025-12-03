import styles from "../../styles/forms/EditarReparacionForm.module.css";
import { useState, useEffect } from "react";
import { selectDarkStyles } from "../../styles/DarkStyles";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { vehiculoService } from "../../services/VehiculoService";
import { reparacionService } from "../../services/reparacionService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface VehiculoOption {
  value: string;
  label: string;
}

interface Props {
  reparacion: any;
  onClose: () => void;
  onReparacionActualizada?: () => void;
}

const validationSchema = Yup.object().shape({
  vehiculo: Yup.object().nullable().required("Seleccione un vehículo"),
  fechaInicio: Yup.string().required("Ingrese la fecha de inicio"),
  fechaFin: Yup.string().nullable(),
  descripcion: Yup.string().required("Ingrese la descripción"),
  precio: Yup.number().typeError("Ingrese un número válido").required("Ingrese el precio"),
});

export const EditarReparacionForm: React.FC<Props> = ({
  reparacion,
  onClose,
  onReparacionActualizada,
}) => {
  const [vehiculos, setVehiculos] = useState<VehiculoOption[]>([]);

  const formatearFecha = (f: string) => (f ? f.split("T")[0] : "");

  useEffect(() => {
    vehiculoService.getVehiculos().then((data) => {
      const mapped = data.map((v: any) => ({
        value: v.id.toString(),
        label: `Patente: ${v.patente}, Auto: ${v.modelo}`,
      }));
      setVehiculos(mapped);
    });
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Reparación</h2>

        <Formik
          enableReinitialize
          initialValues={{
            vehiculo:
              vehiculos.find((v) => Number(v.value) === reparacion.vehiculo_id) ||
              null,
            fechaInicio: formatearFecha(reparacion.fecha_inicio),
            fechaFin: formatearFecha(reparacion.fecha_fin),
            descripcion: reparacion.descripcion || "",
            precio: reparacion.precio?.toString() || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const payload = {
                vehiculo_id: Number(values.vehiculo!.value),
                fecha_inicio: values.fechaInicio,
                fecha_fin: values.fechaFin || null,
                descripcion: values.descripcion,
                precio: Number(values.precio),
                activo: reparacion.activo,
              };
              await reparacionService.update(reparacion.id, payload);
              if (onReparacionActualizada) onReparacionActualizada();
              onClose();
            } catch (err) {
              console.error("Error al actualizar reparación:", err);
              alert("Error al actualizar la reparación");
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className={styles.form}>
              <label>
                Vehículo:
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
                <ErrorMessage
                  name="vehiculo"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label>
                Fecha inicio:
                <Field type="date" name="fechaInicio" />
                <ErrorMessage
                  name="fechaInicio"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label>
                Fecha fin:
                <Field type="date" name="fechaFin" />
              </label>

              <label>
                Descripción pieza a cambiar:
                <Field type="text" name="descripcion" />
                <ErrorMessage
                  name="descripcion"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label>
                Precio estimado:
                <Field type="number" name="precio" />
                <ErrorMessage
                  name="precio"
                  component="div"
                  className={styles.error}
                />
              </label>

              <div className={styles.buttons}>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit">Guardar cambios</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
