import { ReparacionCard } from "../cards/ReparacionCard";

interface Props {
  reparaciones: any[];
  onFinalizar: (id: number) => void;
  onEditar: (id: number) => void;
  onEliminar: (id: number) => void;
}

export const ReparacionList: React.FC<Props> = ({
  reparaciones,
  onFinalizar,
  onEditar,
  onEliminar
}) => {
  return (
    <div>
      {reparaciones.length === 0 ? (
        <p>No hay reparaciones pendientes.</p>
      ) : (
        reparaciones.map((rep) => (
          <ReparacionCard
            key={rep.id}
            reparacion={rep}
            onFinalizar={onFinalizar}
            onEditar={onEditar}
            onEliminar={onEliminar}
          />
        ))
      )}
    </div>
  );
};
