import styles from "../../styles/cards/ReparacionCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { formatearFecha } from "../../functions/FormatearFecha";

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
  onFinalizar: (id: number) => void;
  onEditar: (id: number) => void;
  onEliminar: (id: number) => void;
}


export const ReparacionCard: React.FC<Props> = ({
  reparacion,
  onFinalizar,
  onEditar,
  onEliminar,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3>{reparacion.vehiculo_patente}</h3>
          <p>
            {reparacion.cliente_nombre} - {reparacion.cliente_telefono}
          </p>
        </div>
        <span className={styles.status}>
          {reparacion.activo ? "En progreso" : "Finalizada"}
        </span>
      </div>

      <div className={styles.bodyFooter}>
        <div className={styles.body}>
          <p>
            <strong>Descripción:</strong> {reparacion.descripcion}
          </p>
          <p>
            <strong>Fecha inicio:</strong> {formatearFecha(reparacion.fecha_inicio)}
          </p>
          <p>
            <strong>Fecha fin:</strong> {formatearFecha(reparacion.fecha_fin)}
          </p>
          <p>
            <strong>Precio:</strong> ${reparacion.precio}
          </p>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.btnEditar}
            onClick={() => onEditar(reparacion.id)}
          >
            <FontAwesomeIcon icon={faPen} /> Editar
          </button>

          <button
            className={styles.btnEliminar}
            onClick={() => onEliminar(reparacion.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} /> Eliminar
          </button>

          {reparacion.activo && (
            <button
              className={styles.btnFinalizar}
              onClick={() => onFinalizar(reparacion.id)}
            >
              <FontAwesomeIcon icon={faCheck} /> Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
