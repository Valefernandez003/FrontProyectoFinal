import styles from "../../styles/cards/AutoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface AutoCardProps {
  id: number;
  modelo: string;
  patente: string;
  anio: string;
  color: string;
  cliente_id: number;
  onClick?: () => void;
  onEditarVehiculo?: (auto: {
    id: number;
    modelo: string;
    patente: string;
    anio: string;
    color: string;
    cliente_id: number;
  }) => void;
}

export const AutoCard: React.FC<AutoCardProps> = ({
  id,
  modelo,
  patente,
  anio,
  color,
  cliente_id,
  onClick,
  onEditarVehiculo,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.headerRow}>
        <h4>{modelo}</h4>

        <button
          className={styles.editButton}
          onClick={(e) => {
            e.stopPropagation();
            onEditarVehiculo?.({
              id,
              modelo,
              patente,
              anio,
              color,
              cliente_id
            });
          }}
        >
          <FontAwesomeIcon icon={faPen}/>
        </button>
      </div>

      <p>Patente: {patente}</p>
      <p>Año: {anio}</p>
    </div>
  );
};
