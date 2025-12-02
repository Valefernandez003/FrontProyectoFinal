import { CrearReparacionForm } from "../../components/forms/CrearReparacionForm";

export const CrearReparacionPage = () => {
  return (
    <CrearReparacionForm
      onClose={() => window.history.back()}
    />
  );
};
