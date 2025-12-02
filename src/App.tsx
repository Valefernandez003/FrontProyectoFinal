import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Ganancias } from './pages/Ganancias.tsx';
import { Avisos } from './pages/Avisos.tsx';
import { Clientes } from './pages/Clientes.tsx';
import { Reparaciones } from './pages/Reparaciones.tsx';
import { CrearReparacionForm } from './components/forms/CrearReparacionForm.tsx';
import { CrearVehiculoPage } from './pages/Rutas/CrearVehiculoPage.tsx';
import { CrearClienteForm } from './components/forms/CrearClienteForm.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Ganancias' element={<Ganancias/>}/>
      <Route path='/Avisos' element={<Avisos/>}/>
      <Route path='/Reparaciones' element={<Reparaciones/>}/>
      <Route path='/Clientes' element={<Clientes/>}/>
      <Route path="/CrearReparacion" element={<CrearReparacionForm onClose={() => window.history.back()} />}/>
      <Route path="/CrearVehiculo" element={<CrearVehiculoPage/>}/>
      <Route path='/CrearCliente' element={<CrearClienteForm onClose={() => window.history.back()} />}/>
    </Routes>
  );
}

export default App;