import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../../styles/forms/EliminarReparacionForm.module.css";
import type { Anuncio } from "../../types/Anuncio";

interface Props {
  aviso: Anuncio;
  onCancelar: () => void;
  onConfirmar: (id: number) => void;
}

const EliminarAvisoFormInner: React.FC<Props> = ({
  aviso,
  onCancelar,
  onConfirmar,
}) => {

  useEffect(() => {
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
          <h3>¿Desea eliminar este aviso?</h3>
        </div>

        <div className={styles.content}>
          <p>
            <strong>Título:</strong> {aviso.titulo}
          </p>

          <p>
            <strong>Patente:</strong>{" "}
            {aviso.vehiculo_patente ?? "Sin vehículo"}
          </p>

          <p>
            <strong>Descripción:</strong> {aviso.descripcion}
          </p>

          <p>
            <strong>Vence:</strong>{" "}
            {aviso.fecha_vencimiento
              ? aviso.fecha_vencimiento.slice(0, 10)
              : "Sin fecha"}
          </p>
        </div>

        <div className={styles.buttons}>
          <button onClick={onCancelar}>Cancelar</button>
          <button onClick={() => onConfirmar(aviso.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export const EliminarAvisoForm: React.FC<Props> = (props) => {
  const container = typeof document !== "undefined" ? document.body : null;
  if (!container) return null;
  return createPortal(<EliminarAvisoFormInner {...props} />, container);
};
