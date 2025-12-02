import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import styles from "../styles/Home.module.css";
export const Home = () => {
  return (
    <div>
      <Header />
      <Aside />
      <div className={styles.main}>
        <h1>Bienvenido al sistema de gestion para talleres mecánicos</h1>
        <h3>Para comenzar toque el boton lateral que despliega la barra</h3>
      </div>
    </div>
  );
};
