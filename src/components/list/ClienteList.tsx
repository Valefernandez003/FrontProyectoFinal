import { ClienteCard } from "../cards/ClienteCard";
import type { Cliente } from "../../pages/Clientes";

interface Props {
  clientes: Cliente[];
  onEditar?: (cliente: Cliente) => void;
  onVerAutos?: (cliente: Cliente) => void;
}

export const ClienteList: React.FC<Props> = ({ clientes, onEditar, onVerAutos }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
      gap: "1rem",
      justifyItems: "center",
      width: "100%"
      }}>
      {clientes.map(cliente => (
        <ClienteCard
          key={cliente.id}
          nombre={cliente.nombre}
          telefono={cliente.telefono}
          email={cliente.email}
          onEditar={() => onEditar && onEditar(cliente)}
          onVerAutos={() => onVerAutos && onVerAutos(cliente)}
        />
      ))}
    </div>
  );
};
