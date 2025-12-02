import React from "react";
import styles from "../../styles/cards/AutoReparacionesModal.module.css";

interface Reparacion {
  id: number;
  descripcion: string;
  estado: "pendiente" | "finalizada";
  fecha: string;
}

interface Props {
  autoModelo: string;
  autoPatente: string;
  reparaciones: Reparacion[];
  onClose: () => void;
}

export const AutoReparacionesModal: React.FC<Props> = ({
  autoModelo,
  autoPatente,
  reparaciones,
  onClose,
}) => {
  const pendientes = reparaciones.filter(r => r.estado === "pendiente");
  const finalizadas = reparaciones.filter(r => r.estado === "finalizada");

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>
          Reparaciones de {autoModelo} ({autoPatente})
        </h2>

        <div className={styles.section}>
          <h3>Pendientes</h3>
          {pendientes.length === 0 ? (
            <p>No hay reparaciones pendientes.</p>
          ) : (
            <ul>
              {pendientes.map(r => (
                <li key={r.id}>
                  {r.descripcion} - {r.fecha}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.section}>
          <h3>Finalizadas</h3>
          {finalizadas.length === 0 ? (
            <p>No hay reparaciones finalizadas.</p>
          ) : (
            <ul>
              {finalizadas.map(r => (
                <li key={r.id}>
                  {r.descripcion} - {r.fecha}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.buttons}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};
