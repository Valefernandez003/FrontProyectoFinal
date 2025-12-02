import styles from "../../styles/forms/CrearClienteForm.module.css";
import { clienteService } from "../../services/clienteService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  onClose: () => void;
}

interface ClienteFormValues {
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
}

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  dni: Yup.string()
    .matches(/^[0-9]+$/, "El DNI debe contener solo números")
    .required("El DNI es obligatorio"),
  telefono: Yup.string()
    .matches(/^[0-9]+$/, "El teléfono debe contener solo números")
    .required("El teléfono es obligatorio"),
  email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  direccion: Yup.string().required("La dirección es obligatoria"),
});

export const CrearClienteForm: React.FC<Props> = ({ onClose }) => {
  const initialValues: ClienteFormValues = {
    nombre: "",
    dni: "",
    telefono: "",
    email: "",
    direccion: "",
  };

  const handleSubmit = async (values: ClienteFormValues) => {
    try {
      await clienteService.crearCliente(values);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al crear el cliente");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Agregar Cliente</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <label>
                Nombre:
                <Field type="text" name="nombre" />
                <ErrorMessage name="nombre" component="div" className={styles.error} />
              </label>

              <label>
                DNI:
                <Field type="text" name="dni" />
                <ErrorMessage name="dni" component="div" className={styles.error} />
              </label>

              <label>
                Teléfono:
                <Field type="text" name="telefono" />
                <ErrorMessage name="telefono" component="div" className={styles.error} />
              </label>

              <label>
                Correo electrónico:
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </label>

              <label>
                Dirección:
                <Field type="text" name="direccion" />
                <ErrorMessage name="direccion" component="div" className={styles.error} />
              </label>

              <div className={styles.buttons}>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting}>
                  Guardar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
