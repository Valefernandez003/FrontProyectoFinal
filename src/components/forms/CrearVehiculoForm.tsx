import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { vehiculoService } from "../../services/VehiculoService";
import styles from "../../styles/forms/CrearVehiculoForm.module.css";
import type { Cliente } from "../../types/Cliente";
import { selectDarkStyles } from "../../styles/DarkStyles";

interface Props {
  onClose: () => void;
  clientes: Cliente[];
  onVehiculoCreado?: (vehiculoCreado: any) => void;
}

const validationSchema = Yup.object({
  patente: Yup.string()
    .matches(/^[A-Za-z].*$/, "La patente no puede iniciar con un número")
    .required("La patente es obligatoria"),
  modelo: Yup.string().required("El modelo es obligatorio"),
  anio: Yup.number()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear(), "Año inválido")
    .required("Ingrese el año"),
  color: Yup.string().required("Ingrese un color"),
  cliente_id: Yup.number().required("Debe seleccionar un cliente"),
});

export const CrearVehiculoForm: React.FC<Props> = ({
  onClose,
  clientes,
  onVehiculoCreado,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear Vehículo</h2>

        <Formik
          initialValues={{
            patente: "",
            modelo: "",
            anio: 0,
            color: "",
            cliente_id: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const uppercaseValues = {
                ...values,
                patente: values.patente.toUpperCase(),
              };

              const vehiculoCreado = await vehiculoService.crearVehiculo(
                uppercaseValues
              );

              if (onVehiculoCreado) onVehiculoCreado(vehiculoCreado);
              onClose();
            } catch (error: any) {
              if (error.response?.status === 409) {
                alert("La patente ya está registrada");
              } else {
                alert("Error inesperado al crear vehículo");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className={styles.form}>
              <label>
                Patente:
                <Field
                  type="text"
                  name="patente"
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                    setFieldValue("patente", e.target.value.toUpperCase());
                  }}
                />
                <ErrorMessage
                  name="patente"
                  component="p"
                  className={styles.error}
                />
              </label>

              <label>
                Modelo:
                <Field type="text" name="modelo" />
                <ErrorMessage
                  name="modelo"
                  component="p"
                  className={styles.error}
                />
              </label>

              <label>
                Año:
                <Field type="number" name="anio" />
                <ErrorMessage
                  name="anio"
                  component="p"
                  className={styles.error}
                />
              </label>

              <label>
                Color:
                <Field type="text" name="color" />
                <ErrorMessage
                  name="color"
                  component="p"
                  className={styles.error}
                />
              </label>

              <label>
                Cliente:
                <Select
                  options={clientes.map((c) => ({
                    value: c.id,
                    label: c.nombre,
                  }))}
                  onChange={(option: any) =>
                    setFieldValue("cliente_id", option.value)
                  }
                  placeholder="Seleccione un cliente"
                  isSearchable
                  styles={selectDarkStyles}
                />
                <ErrorMessage
                  name="cliente_id"
                  component="p"
                  className={styles.error}
                />
              </label>

              <div className={styles.buttons}>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit">Guardar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
