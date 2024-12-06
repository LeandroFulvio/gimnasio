import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PaymentManager from './PaymentManager';

import SocioEditForm from './SocioEditForm';

function SocioList({ trigger }) {
  const [socios, setSocios] = useState([]);

  //For edit
  const [editingId, setEditingId] = useState(null);

  //For pays
  const [selectedSocioId, setSelectedSocioId] = useState(null);

  const fetchSocios = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/socios');
      setSocios(response.data);
    } catch (error) {
      console.error('Error fetching socios:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar este Socio?')) {
      try {
        await axios.delete(`http://localhost:5050/api/socios/${id}`);
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
      const response = await axios.put(
        `http://localhost:5050/api/socios/${editingId}`,
        formData
      );
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
                    <div className="btn-group">
                      <button 
                        onClick={() => handleEdit(socio)}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(socio._id)}
                        className="btn btn-danger btn-sm me-2"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => setSelectedSocioId(selectedSocioId === socio._id ? null : socio._id)}
                        className="btn btn-info btn-sm"
                      >
                        {selectedSocioId === socio._id ? 'Ocultar Pagos' : 'Ver Pagos'}
                      </button>
                    </div>
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