import { AvisoCard } from "../cards/AvisoCard";
import type { Anuncio } from "../../types/Anuncio";

interface Props {
  avisos: Anuncio[];
  onEditar: (id: number) => void;
  onEliminar: (id: number) => void;
}

export const AvisoList: React.FC<Props> = ({ avisos, onEditar, onEliminar }) => {
  if (avisos.length === 0) return <p>No hay avisos.</p>;

  return (
    <div>
      {avisos.map((aviso) => (
        <AvisoCard
          key={aviso.id}
          aviso={aviso}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
};
