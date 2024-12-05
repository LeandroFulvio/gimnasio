import { useState } from 'react';
import SocioList from './components/SocioList';
import CreateSocio from './components/CreateSocio';

function Home() {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleSocioCreated = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Gestión de Gimnasio</span>
        </div>
      </nav>
      <CreateSocio onSuccess={handleSocioCreated} />
      <SocioList trigger={updateTrigger} />
    </div>
  );
}

export default Home;