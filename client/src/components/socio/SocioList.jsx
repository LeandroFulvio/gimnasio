import React, { useState, useEffect } from 'react';

import PaymentManager from '../PaymentManager';
import SocioEditForm from './SocioEditForm';
import SocioActions from './SocioActions';

import socioService from '../services/SocioService';

function SocioList({ trigger }) {
  const [socios, setSocios] = useState([]);

  //For edit
  const [editingId, setEditingId] = useState(null);

  //For pays
  const [selectedSocioId, setSelectedSocioId] = useState(null);

  //Para dropbox de clases a anotarse
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchSocios = async () => {
    try {
      const response = await socioService.getAllSocios();
      setSocios(response.data);
    } catch (error) {
      console.error('Error fetching socios:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar este Socio?')) {
      try {
        await socioService.deleteSocio(id);
        setSocios(socios.filter(socio => socio._id !== id));
      } catch (error) {
        console.error('Error eliminando el socio:', error);
        alert('Error al eliminar socio');
      }
    }
  };

  const handleEdit = (socio) => {
    setEditingId(socio._id);
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await socioService.updateSocio(editingId, formData);
      setSocios(socios.map(socio => 
        socio._id === editingId ? response.data : socio
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating socio:', error);
      alert('Error al actualizar socio');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    fetchSocios();
  }, [trigger]); // Re-fetch when trigger changes

  return (
    <div className="container mt-4">
      <h2>Lista de Socios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-3">Nombre</th>
            <th className="col-2">DNI</th>
            <th className="col-2">Estado</th>
            <th className="col-2">Clases Inscriptas</th>
            <th className="col-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios.map((socio) => (
            <React.Fragment key={socio._id}>
              {editingId === socio._id ? (
                <SocioEditForm
                  socio={socio}
                  onUpdate={handleUpdate}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <tr>
                  <td>{socio.name}</td>
                  <td>{socio.dni}</td>
                  <td>{socio.active ? 'Activo' : 'Inactivo'}</td>
                  <td>{socio?.enrolledClasses?.length || 0} clases</td>
                  <td>
                    <SocioActions
                      socio={socio}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onTogglePayments={(id) => setSelectedSocioId(selectedSocioId === id ? null : id)}
                      showingPayments={selectedSocioId === socio._id}
                      onEnrollmentComplete={() => {
                        setRefreshTrigger(prev => prev + 1);
                        fetchSocios();
                      }} // Para actualizar la lista despues de una inscripcion y el dropbox con clases
                    />
                  </td>
                </tr>
              )}
              {selectedSocioId === socio._id && (
                <tr>
                  <td colSpan="5">
                    <PaymentManager socioId={socio._id} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SocioList;