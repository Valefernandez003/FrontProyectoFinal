import styles from "../styles/Header.module.css";
import logoTaller from "../assets/logoTaller.png";

export const Header = () => {
  return (
    <header className={styles.container}>
      <h2 className={styles.title}>Sistema de Gestión de Taller</h2>
      <div className={styles.logo}>
        <img src={logoTaller} alt="Logo del taller" />
      </div>
    </header>
  );
};
