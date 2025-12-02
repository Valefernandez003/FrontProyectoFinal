import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import { CrearAvisoForm } from "../components/forms/CrearAvisoForm";
import styles from "../styles/Avisos.module.css";
import { EditarAvisoForm } from "../components/forms/EditarAvisoForm";
import { EliminarAvisoForm } from "../components/forms/EliminarAvisoForm";
import { AvisoList } from "../components/list/AvisoList";
import { anuncioService } from "../services/anuncioService";
import type { Anuncio } from "../types/Anuncio";

export const Avisos = () => {
  const [showCrearAviso, setShowCrearAviso] = useState(false);
  const [avisos, setAvisos] = useState<Anuncio[]>([]);
  const [avisoEditar, setAvisoEditar] = useState<Anuncio | null>(null);
  const [avisoEliminar, setAvisoEliminar] = useState<Anuncio | null>(null);

  const fetchAvisos = async () => {
    try {
      const data = await anuncioService.getAnuncios("todo");
      console.log("Datos recibidos del API:", data);
      setAvisos(data);
    } catch (err) {
      console.error("Error al cargar avisos:", err);
    }
  };

  const handleEditar = (id: number) => {
    const encontrado = avisos.find(a => a.id === id);
    if (encontrado) setAvisoEditar(encontrado);
  };

  const handleEliminar = (id: number) => {
    const encontrado = avisos.find(a => a.id === id);
    if (encontrado) setAvisoEliminar(encontrado);
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  const handleCrearAviso = async () => {
    setShowCrearAviso(true);
  };

  const handleCerrarForm = () => {
    setShowCrearAviso(false);
    fetchAvisos();
  };

  return (
    <div>
      <Header />
      <Aside />

      <div className={styles.main}>
        <h1 className={styles.title}>Avisos</h1>

        <div className={styles.container}>
          <div className={styles.avisos}>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={handleCrearAviso}
              >
                Crear aviso
              </button>
            </div>

            <AvisoList
              avisos={avisos}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          </div>
        </div>
      </div>

      {avisoEditar && (
        <EditarAvisoForm
          aviso={avisoEditar}
          onClose={() => {
            setAvisoEditar(null);
            fetchAvisos();
          }}
        />
      )}

      {avisoEliminar && (
        <EliminarAvisoForm
          aviso={avisoEliminar}
          onCancelar={() => setAvisoEliminar(null)}
          onConfirmar={async (id) => {
            await anuncioService.deleteAnuncio(id);
            setAvisoEliminar(null);
            fetchAvisos();
          }}
        />
      )}

      {showCrearAviso && (
        <CrearAvisoForm onClose={handleCerrarForm} />
      )}
    </div>
  );
};
