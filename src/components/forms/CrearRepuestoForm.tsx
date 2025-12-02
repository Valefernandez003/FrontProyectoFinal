import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../styles/forms/CrearRepuestoForm.module.css";
import type { RepuestoFormData } from "../../types/Repuesto";
import { repuestoService } from "../../services/repuestoService";

interface Props {
  onClose: () => void;
  onRepuestoCreado?: (nuevo: any) => void;
}

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  cantidad: Yup.number()
    .required("Ingrese cantidad")
    .min(1, "Debe ser al menos 1"),
  costo: Yup.number()
    .required("Ingrese costo")
    .min(0, "El costo no puede ser negativo"),
});

export const CrearRepuestoForm: React.FC<Props> = ({ onClose, onRepuestoCreado}) => {
  const initialValues: RepuestoFormData= {
    nombre: "",
    cantidad: 1,
    costo: 0,
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear Repuesto</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                ...values,
                cantidad: Number(values.cantidad),
                costo: Number(values.costo),
              };

              const repuestoCreado = await repuestoService.create(payload);

              if (onRepuestoCreado) onRepuestoCreado(repuestoCreado);
              onClose();
            } catch (error) {
              console.error(error);
              alert("Hubo un problema al guardar el repuesto");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form className={styles.form}>
            <label>
              Nombre:
              <Field type="text" name="nombre" />
              <ErrorMessage name="nombre" component="p" className={styles.error} />
            </label>

            <label>
              Cantidad:
              <Field type="number" name="cantidad" />
              <ErrorMessage name="cantidad" component="p" className={styles.error} />
            </label>

            <label>
              Costo:
              <Field type="number" name="costo" />
              <ErrorMessage name="costo" component="p" className={styles.error} />
            </label>

            <div className={styles.buttons}>
              <button type="button" onClick={onClose}>Cancelar</button>
              <button type="submit">Guardar</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
