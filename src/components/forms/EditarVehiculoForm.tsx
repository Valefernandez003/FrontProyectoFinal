import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { vehiculoService } from "../../services/VehiculoService";
import styles from "../../styles/forms/EditarVehiculoForm.module.css";
import type { Cliente } from "../../types/Cliente";
import { selectDarkStyles } from "../../styles/DarkStyles";

interface Props {
  onClose: () => void;
  clientes: Cliente[];
  vehiculo: any;
  onVehiculoEditado?: (vehiculoActualizado: any) => void;
}

const validationSchema = Yup.object({
  patente: Yup.string().required("La patente es obligatoria"),
  modelo: Yup.string().required("El modelo es obligatorio"),
  anio: Yup.number()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear(), "Año inválido")
    .required("Ingrese el año"),
  color: Yup.string().required("Ingrese un color"),
  cliente_id: Yup.number().required("Debe seleccionar un cliente"),
});

export const EditarVehiculoForm: React.FC<Props> = ({
  onClose,
  clientes,
  vehiculo,
  onVehiculoEditado,
}) => {
  return (
    <div className={styles.editoverlay}>
      <div className={styles.modal}>
        <h2>Editar Vehículo</h2>

        <Formik
          initialValues={{
            patente: vehiculo.patente || "",
            modelo: vehiculo.modelo || "",
            anio: vehiculo.anio || "",
            color: vehiculo.color || "",
            cliente_id: vehiculo.cliente_id || 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
          try {
            const uppercaseValues = {
              ...values,
              patente: values.patente.toUpperCase(),
            };

            const actualizado = await vehiculoService.actualizarVehiculo(
              vehiculo.id,
              uppercaseValues
            );

            if (actualizado && onVehiculoEditado) {
              onVehiculoEditado(actualizado);
            }

            onClose();
          } catch (error: any) {
            alert("Error al actualizar el vehículo");
          } finally {
            setSubmitting(false);
          }
        }}
        >
          {({ setFieldValue, values }) => (
            <Form className={styles.form}>
              <label>
                Patente:
                <Field
                  type="text"
                  name="patente"
                  value={values.patente}
                  onChange={(e: any) =>
                    setFieldValue("patente", e.target.value.toUpperCase())
                  }
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
                  value={
                    clientes
                      .map((c) => ({ value: c.id, label: c.nombre }))
                      .find((opt) => opt.value === values.cliente_id) || null
                  }
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
                <button type="submit">Guardar Cambios</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
