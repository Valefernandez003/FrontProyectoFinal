import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../../styles/forms/EliminarReparacionForm.module.css";

interface Reparacion {
  id: number;
  vehiculo_patente: string;
  cliente_nombre: string;
  cliente_telefono: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  precio: number;
  activo: boolean;
}

interface Props {
  reparacion: Reparacion;
  onCancelar: () => void;
  onConfirmar: (id: number) => void;
}

const EliminarReparacionFormInner: React.FC<Props> = ({
  reparacion,
  onCancelar,
  onConfirmar,
}) => {
  useEffect(() => { /* Solucion del overlay que no cubre el boton */
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>¿Desea eliminar esta reparación?</h3>
        </div>
        <div className={styles.content}>
          <p><strong>Patente:</strong> {reparacion.vehiculo_patente}</p>
          <p><strong>{reparacion.cliente_nombre}</strong> - {reparacion.cliente_telefono}</p>
          <p><strong>Descripción:</strong> {reparacion.descripcion}</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={onCancelar}>Cancelar</button>
          <button onClick={() => onConfirmar(reparacion.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export const EliminarReparacionForm: React.FC<Props> = (props) => {
  const container = typeof document !== "undefined" ? document.body : null;
  if (!container) return null;
  return createPortal(<EliminarReparacionFormInner {...props} />, container);
};
