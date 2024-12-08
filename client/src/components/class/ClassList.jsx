import { useState, useEffect } from 'react';
import axios from 'axios';

function ClassList({ trigger }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, [trigger]); // Re-fetch when trigger changes

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/classes');
      setClasses(response.data);

    } catch (error) {
      console.error('Error fetching clases:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar esta clase?')) {
      try {
        await axios.delete(`http://localhost:5050/api/classes/${id}`);
        setClasses(classes.filter(classItem => classItem._id !== id));
      } catch (error) {
        console.error('Error deleting class:', error);
        alert('Error al eliminar la clase');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Clases</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Profesor</th>
            <th>Horario</th>
            <th>Capacidad</th>
            <th>Inscritos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>{classItem.name}</td>
              <td>{classItem.professor}</td>
              <td>{classItem.schedule}</td>
              <td>{classItem.capacity}</td>
              <td>{classItem.enrolled?.length || 0}</td>
              <td>
                <button
                  onClick={() => handleDelete(classItem._id)}
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

export default ClassList;