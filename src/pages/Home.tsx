import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import styles from "../styles/Home.module.css";
import { anuncioService } from "../services/anuncioService";
import type { Anuncio } from "../types/Anuncio";


const formatearFecha = (f: string | null) => {
  if (!f) return "-";
  const d = new Date(f);
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

export const Home = () => {
  const [avisos, setAvisos] = useState<Anuncio[]>([]);

  const fetchAvisos = async () => {
    const data = await anuncioService.getAnuncios("todo");
    const ordenados = data
      .filter(a => a.fecha_vencimiento)
      .sort(
        (a, b) =>
          new Date(a.fecha_vencimiento).getTime() -
          new Date(b.fecha_vencimiento).getTime()
      )
      .slice(0, 3);

    setAvisos(ordenados);
  };


  useEffect(() => {
    fetchAvisos();
  }, []);

  return (
    <div>
      <Header />
      <Aside />

      <div className={styles.main}>
        <h1>Bienvenido al sistema de gestión de talleres mecánicos</h1>

        <h3>Últimos avisos</h3>
        <div className={styles.cardContainer}>
          {avisos.length === 0 && <p>No hay avisos próximos.</p>}
          {avisos.map(a => (
            <div key={a.id} className={styles.card}>
              <h4>{a.titulo}</h4>
              <p>{a.descripcion}</p>
              <p>
                <strong>Vencimiento:</strong>{" "}
                {formatearFecha(a.fecha_vencimiento)}
              </p>
            </div>
          ))}
        </div>

        </div>
      </div>
  );
};
