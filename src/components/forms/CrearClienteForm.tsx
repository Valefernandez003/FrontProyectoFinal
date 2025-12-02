import styles from "../../styles/forms/CrearClienteForm.module.css";
import { useState } from "react";
import { clienteService } from "../../services/clienteService";

interface Props {
  onClose: () => void;
}

export const CrearClienteForm: React.FC<Props> = ({ onClose }) => {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoCliente = {
      nombre,
      dni,
      telefono,
      email,
      direccion,
    };

    try {
      await clienteService.crearCliente(nuevoCliente);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al crear el cliente");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Agregar Cliente</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>

          <label>
            DNI:
            <input 
              type="number" 
              value={dni} 
              onChange={(e) => setDni(e.target.value)}
            />
          </label>

          <label>
            Teléfono:
            <input 
              type="number" 
              value={telefono} 
              onChange={(e) => setTelefono(e.target.value)}
            />
          </label>

          <label>
            Correo electrónico:
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Dirección:
            <input 
              type="text" 
              value={direccion} 
              onChange={(e) => setDireccion(e.target.value)}
            />
          </label>

          <div className={styles.buttons}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
