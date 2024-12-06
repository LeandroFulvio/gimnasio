import { useState, useEffect } from 'react';
import axios from 'axios';

import PaymentManager from './PaymentManager';

function SocioList({ trigger }) {
  const [socios, setSocios] = useState([]);

  //For edit
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    dni: '',
    active: true
  });

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
        console.error('Error deleting socio:', error);
        alert('Error al eliminar socio');
      }
    }
  };

  const handleEdit = (socio) => {
    setEditingId(socio._id);
    setEditForm({
      name: socio.name,
      dni: socio.dni,
      active: socio.active
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/socios/${editingId}`,
        editForm
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
            <th>Nombre</th>
            <th>DNI</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios.map((socio) => (
            <>
              <tr key={socio._id}>
                {editingId === socio._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editForm.dni}
                        onChange={(e) => setEditForm({...editForm, dni: e.target.value})}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <select
                        value={editForm.active}
                        onChange={(e) => setEditForm({...editForm, active: e.target.value === 'true'})}
                        className="form-control"
                      >
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdate} className="btn btn-success btn-sm me-2">
                        Guardar
                      </button>
                      <button onClick={handleCancelEdit} className="btn btn-secondary btn-sm">
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{socio.name}</td>
                    <td>{socio.dni}</td>
                    <td>{socio.active ? 'Activo' : 'Inactivo'}</td>
                    <td>
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
                    </td>
                  </>
                )}
              </tr>
              {selectedSocioId === socio._id && (
                <tr>
                  <td colSpan="4">
                    <PaymentManager socioId={socio._id} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SocioList;