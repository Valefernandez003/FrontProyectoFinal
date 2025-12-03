import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { useState, useEffect } from "react";
import { vehiculoService } from "../../services/VehiculoService";
import { anuncioService } from "../../services/anuncioService";
import { selectDarkStyles } from "../../styles/DarkStyles";
import styles from "../../styles/forms/CrearAvisoForm.module.css";

interface VehiculoOption {
  value: string;
  label: string;
}
interface PrioridadOption {
  value: number;
  label: string;
}
interface Props {
  onClose: () => void;
}

export const CrearAvisoForm: React.FC<Props> = ({ onClose }) => {
  const [vehiculos, setVehiculos] = useState<VehiculoOption[]>([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<VehiculoOption | null>(null);

  const prioridades: PrioridadOption[] = [
    { value: 1, label: "Baja" },
    { value: 2, label: "Media" },
    { value: 3, label: "Alta" },
  ];
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState<PrioridadOption | null>(prioridades[0]);

  // Cargar vehículos
  useEffect(() => {
    vehiculoService.getVehiculos().then((data) => {
      const mapped = data.map((v: any) => ({
        value: v.id.toString(),
        label: `Patente: ${v.patente}, Auto: ${v.modelo}`,
      }));
      setVehiculos(mapped);
    });
  }, []);

  const initialValues = {
    titulo: "",
    descripcion: "",
    fecha_vencimiento: "",
    prioridad: 1,
  };

  const validationSchema = Yup.object({
    titulo: Yup.string().required("El título es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    fecha_vencimiento: Yup.date().required("La fecha de vencimiento es obligatoria"),
    prioridad: Yup.number().required("La prioridad es obligatoria"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const payload = {
      ...values,
      prioridad: prioridadSeleccionada?.value ?? 1,
      vehiculo_id: vehiculoSeleccionado ? Number(vehiculoSeleccionado.value) : null,
    };

    try {
      await anuncioService.createAnuncio(payload);
      onClose();
    } catch (err) {
      console.error("Error creando anuncio:", err);
      alert("Error al crear anuncio");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear Anuncio</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className={styles.form}>
              <label>
                Título:
                <Field type="text" name="titulo" />
                <ErrorMessage name="titulo" component="p" className={styles.error} />
              </label>

              <label>
                Descripción:
                <Field type="text" name="descripcion" />
                <ErrorMessage name="descripcion" component="p" className={styles.error} />
              </label>

              <label>
                Fecha de vencimiento:
                <Field type="date" name="fecha_vencimiento" />
                <ErrorMessage name="fecha_vencimiento" component="p" className={styles.error} />
              </label>

              <label>
                Prioridad:
                <div className={styles.reactSelectWrapper}>
                  <Select
                    options={prioridades}
                    value={prioridadSeleccionada}
                    onChange={(newValue: SingleValue<PrioridadOption>) => {
                      setPrioridadSeleccionada(newValue);
                      setFieldValue("prioridad", newValue?.value ?? 1);
                    }}
                    placeholder="Seleccionar prioridad..."
                    styles={selectDarkStyles}
                  />
                </div>
                <ErrorMessage name="prioridad" component="p" className={styles.error} />
              </label>

              <label>
                Vehículo (opcional):
                <div className={styles.reactSelectWrapper}>
                  <Select
                    options={vehiculos}
                    value={vehiculoSeleccionado}
                    onChange={(newValue: SingleValue<VehiculoOption>) =>
                      setVehiculoSeleccionado(newValue)
                    }
                    placeholder="Buscar vehículo..."
                    isSearchable
                    styles={selectDarkStyles}
                  />
                </div>
              </label>

              <div className={styles.buttons}>
                <button type="button" onClick={onClose}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
