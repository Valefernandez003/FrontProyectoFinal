import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Aside.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPen, faCoins, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import logoTaller from "../assets/logoTaller.png";
import { useAsideStore } from "../store/useAsideStore";

export const Aside: React.FC = () => {
  const { open, toggleOpen } = useAsideStore();
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header>
      {/* Botón menú */}
      <div
        className={`${styles.menuBtn} ${open ? styles.close : ""}`}
        onClick={toggleOpen}
      >
        <div className={styles.btnLine}></div>
        <div className={styles.btnLine}></div>
        <div className={styles.btnLine}></div>
      </div>

      {/* Aside */}
      <aside className={`${styles.menu} ${open ? styles.show : ""}`}>
        <div className={styles.menuBranding}>
          <img src={logoTaller} alt="Logo del taller" />
        </div>

        <nav className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${isActive("/") ? styles.activeButton : ""}`}
            onClick={() => go("/")}
          >
            <FontAwesomeIcon icon={faHome} /> Inicio
          </button>

          <button
            className={`${styles.button} ${isActive("/Reparaciones") ? styles.activeButton : ""}`}
            onClick={() => go("/Reparaciones")}
          >
            <FontAwesomeIcon icon={faCar} /> Reparaciones
          </button>

          <button
            className={`${styles.button} ${isActive("/Clientes") ? styles.activeButton : ""}`}
            onClick={() => go("/Clientes")}
          >
            <FontAwesomeIcon icon={faUser} /> Clientes
          </button>

          <button
            className={`${styles.button} ${isActive("/Ganancias") ? styles.activeButton : ""}`}
            onClick={() => go("/Ganancias")}
          >
            <FontAwesomeIcon icon={faCoins}/> Ganancias
          </button>

          <button
            className={`${styles.button} ${isActive("/Avisos") ? styles.activeButton : ""}`}
            onClick={() => go("/Avisos")}
          >
            <FontAwesomeIcon icon={faPen} /> Avisos
          </button>
        </nav>
      </aside>
    </header>
  );
};
