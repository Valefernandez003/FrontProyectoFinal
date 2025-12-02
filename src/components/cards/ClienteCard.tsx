import styles from "../../styles/cards/ClienteCard.module.css";

interface Props {
  nombre: string;
  telefono: string;
  email?: string;
  onEditar?: () => void;
  onVerAutos?: () => void;
}

export const ClienteCard: React.FC<Props> = ({ nombre, telefono, email, onEditar, onVerAutos }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{nombre}</h3>
      </div>
      <div className={styles.body}>
        <p>Teléfono: {telefono}</p>
        {email && <p>Email: {email}</p>}
      </div>
      <div className={styles.buttons}>
        {onEditar && <button onClick={onEditar}>Editar</button>}
        {onVerAutos && <button onClick={onVerAutos}>Ver Autos</button>}
      </div>
    </div>
  );
};
