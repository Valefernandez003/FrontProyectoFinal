import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import styles from "../styles/Ganancias.module.css";
import { reparacionService } from "../services/reparacionService";
import { repuestoService } from "../services/repuestoService";

interface Movimiento {
  id: number;
  descripcion: string;
  monto: number;
  tipo: "ingreso" | "egreso";
  fecha: string;
}

export const Ganancias = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState<string>("");
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

  const meses: Record<string, number> = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };

  useEffect(() => {
    const fetchMovimientos = async () => {
      setCargando(true);
      try {
        const [reparaciones, repuestos] = await Promise.all([
          reparacionService.getAll(),
          repuestoService.getAllIncludingInactive(),
        ]);

        let movimientosTemp: Movimiento[] = [];

        reparaciones.forEach(r => {
          const fecha = r.fecha_fin ?? r.fecha_inicio;
          if (!fecha) return;

          // INGRESO
          movimientosTemp.push({
            id: r.id,
            descripcion: r.descripcion ?? "Sin descripción",
            monto: Number(r.precio ?? 0),
            tipo: "ingreso",
            fecha,
          });

          // EGRESO
          if (r.repuesto_id != null) {
            const repuesto = repuestos.find(rep => Number(rep.id) === Number(r.repuesto_id));
            if (repuesto) {
              movimientosTemp.push({
                id: r.id + 10000,
                descripcion: `Costo repuesto ${repuesto.nombre ?? "Sin nombre"}`,
                monto: Number(repuesto.costo ?? 0),
                tipo: "egreso",
                fecha,
              });
            }
          }
        });

        if (mesSeleccionado) {
          const mesNum = meses[mesSeleccionado];
          const actualYear = new Date().getFullYear();
          movimientosTemp = movimientosTemp.filter(m => {
            const fechaObj = new Date(m.fecha);
            return fechaObj.getMonth() === mesNum && fechaObj.getFullYear() === actualYear;
          });
        }

        movimientosTemp.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

        setMovimientos(movimientosTemp);

      } catch (err) {
        console.error("Error al cargar movimientos:", err);
        setMovimientos([]);
      } finally {
        setCargando(false);
      }
    };

    fetchMovimientos();
  }, [mesSeleccionado]);

  const ingresos = movimientos.filter(m => m.tipo === "ingreso");
  const egresos = movimientos.filter(m => m.tipo === "egreso");

  const totalIngresos = ingresos.reduce((acc, curr) => acc + curr.monto, 0);
  const totalEgresos = egresos.reduce((acc, curr) => acc + curr.monto, 0);
  const total = totalIngresos - totalEgresos;

  return (
    <div>
      <Header />
      <Aside />

      <div className={styles.main}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Historial de movimientos</h2>

          <select
            className={styles.monthSelect}
            value={mesSeleccionado}
            onChange={e => setMesSeleccionado(e.target.value)}
          >
            <option value="">Seleccionar mes</option>
            <option value="enero">Enero</option>
            <option value="febrero">Febrero</option>
            <option value="marzo">Marzo</option>
            <option value="abril">Abril</option>
            <option value="mayo">Mayo</option>
            <option value="junio">Junio</option>
            <option value="julio">Julio</option>
            <option value="agosto">Agosto</option>
            <option value="septiembre">Septiembre</option>
            <option value="octubre">Octubre</option>
            <option value="noviembre">Noviembre</option>
            <option value="diciembre">Diciembre</option>
          </select>
        </div>

        <div className={styles.container}>
          <div className={styles.contenido}>
            <h4 className={styles.subtitle}>Ingresos de dinero</h4>
            {cargando ? (
              <p>Cargando...</p>
            ) : ingresos.length === 0 ? (
              <p className={styles.message}>No hay ingresos registrados</p>
            ) : (
              <ul>
                {ingresos.map(m => (
                  <li key={m.id}>
                    Precio {m.descripcion} - ${m.monto} - {new Date(m.fecha).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.contenido}>
            <h4 className={styles.subtitle}>Salidas de dinero</h4>
            {cargando ? (
              <p>Cargando...</p>
            ) : egresos.length === 0 ? (
              <p className={styles.message}>No hay salidas registradas</p>
            ) : (
              <ul>
                {egresos.map(m => (
                  <li key={m.id}>
                    {m.descripcion} - ${m.monto} - {new Date(m.fecha).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.total}>
            <h4 className={styles.subtitle}>Resultado</h4>
            <div className={styles.financialList}>
              <p>Ingresos: ${totalIngresos}</p>
              <p>Egresos: ${totalEgresos}</p>
              <p>Ganancia total: ${total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
