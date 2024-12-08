import { useState } from 'react';
import SocioList from './components/socio/SocioList';
import CreateSocio from './components/socio/CreateSocio';

function Home() {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleSocioCreated = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="container p-0">
      <div className="row">
        <div className="col-12">
          <CreateSocio onSuccess={handleSocioCreated} />
          <SocioList trigger={updateTrigger} />
        </div>
      </div>
    </div>
  );
}

export default Home;