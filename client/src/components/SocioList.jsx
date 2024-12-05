import { useState, useEffect } from 'react';
import axios from 'axios';

function SocioList({ trigger }) {
  const [socios, setSocios] = useState([]);

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
            <tr key={socio._id}>
              <td>{socio.name}</td>
              <td>{socio.dni}</td>
              <td>{socio.active ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button
                  onClick={() => handleDelete(socio._id)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SocioList;