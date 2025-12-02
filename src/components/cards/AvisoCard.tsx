import styles from "../../styles/cards/AvisoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { formatearFecha } from "../../functions/FormatearFecha";
import type { Anuncio } from "../../types/Anuncio";

interface Props {
  aviso: Anuncio;
  onEditar: (id: number) => void;
  onEliminar: (id: number) => void;
}
const prioridadTexto = (prioridad: number) => {
  switch (prioridad) {
    case 1: return "Baja";
    case 2: return "Media";
    case 3: return "Alta";
    default: return "Desconocida";
  }
};
export const AvisoCard: React.FC<Props> = ({ aviso, onEditar, onEliminar }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3>{aviso.titulo}</h3>
          <p>{aviso.vehiculo_patente ? `patente: ${aviso.vehiculo_patente}` : "Sin vehículo"}</p>
        </div>
        <span className={styles.status}>
          Prioridad: {prioridadTexto(Number(aviso.prioridad))}
        </span>
      </div>

      <div className={styles.bodyFooter}>
        <div className={styles.body}>
          <p>
            <strong>Descripción:</strong> {aviso.descripcion}
          </p>
          <p>
            <strong>Vencimiento:</strong> {formatearFecha(aviso.fecha_vencimiento)}
          </p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.btnEditar} onClick={() => onEditar(aviso.id)}>
            <FontAwesomeIcon icon={faPen} /> Editar
          </button>

          <button className={styles.btnEliminar} onClick={() => onEliminar(aviso.id)}>
            <FontAwesomeIcon icon={faTrashCan} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
