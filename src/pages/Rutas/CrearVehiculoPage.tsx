import { useEffect, useState } from "react";
import { CrearVehiculoForm } from "../../components/forms/CrearVehiculoForm";
import { clienteService } from "../../services/clienteService";
import type { Cliente } from "../../types/Cliente";

export const CrearVehiculoPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    clienteService.getClientes().then((data) => setClientes(data));
  }, []);

  return (
    <CrearVehiculoForm
      clientes={clientes}
      onClose={() => window.history.back()}
    />
  );
};
