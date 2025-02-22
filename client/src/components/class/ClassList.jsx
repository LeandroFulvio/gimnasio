import { useState, useEffect } from 'react';
import classService from '../services/ClassService';
import paymentService from '../services/PaymentService';
import socioService from '../services/SocioService';

function ClassList({ trigger }) {
  const [classes, setClasses] = useState([]);
  const [selectedSocios, setSelectedSocios] = useState({});
  const [validationResults, setValidationResults] = useState({});
  const [showMessage, setShowMessage] = useState({});

  useEffect(() => {
    fetchClasses();
  }, [trigger]); // Re-fetch when trigger changes

  const fetchClasses = async () => {
    try {
      const response = await classService.getAllClasses();
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching clases:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar esta clase?')) {
      try {
        await classService.deleteClass(id);
        setClasses(classes.filter(classItem => classItem._id !== id));
      } catch (error) {
        console.error('Error deleting class:', error);
        alert('Error al eliminar la clase');
      }
    }
  };

  const handleSocioSelect = (classId, socio) => {
    setSelectedSocios({
      ...selectedSocios,
      [classId]: socio
    });
    setShowMessage({
      ...showMessage,
      [classId]: false
    });
    setValidationResults({
      ...validationResults,
      [classId]: null
    });
  };

  const handleValidation = async (classId) => {
    try {
      const socioId = selectedSocios[classId]._id;
      const response = await paymentService.validateActivePayment(socioId); 

      setValidationResults({
        ...validationResults,
        [classId]: response.data.isValid
      });

      setShowMessage({
        ...showMessage,
        [classId]: true
      });

      if (!response.data.isValid) {
        const response = await socioService.unenrollSocioFromClass(selectedSocios[classId]._id, classId);
        console.log(response);

        await fetchClasses();

        setSelectedSocios({
          ...selectedSocios,
          [classId]: null
        });
      }
    } catch (error) {
      console.error('Error validando pago:', error);
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
            <th>Lista de Inscritos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <>
              <tr key={classItem._id}>
                <td>{classItem.name}</td>
                <td>{classItem.professor}</td>
                <td>{classItem.schedule}</td>
                <td>{classItem.capacity}</td>
                <td>{classItem.enrolled?.length || 0}</td>
                <td>
                  <select 
                    className="form-select"
                    onChange={(e) => handleSocioSelect(classItem._id, classItem.enrolled[e.target.value])}
                    value={selectedSocios[classItem._id] ? classItem.enrolled.indexOf(selectedSocios[classItem._id]) : ""}
                  >
                    <option value="" disabled>Seleccionar Socio</option>
                    {classItem.enrolled?.map((socio, index) => (
                      <option key={socio._id} value={index}>
                        {socio.name} - DNI: {socio.dni}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="btn-group">
                    <button 
                      onClick={() => handleDelete(classItem._id)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Eliminar
                    </button>
                    {selectedSocios[classItem._id] && (
                      <button 
                        onClick={() => handleValidation(classItem._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Validar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {showMessage[classItem._id] && validationResults[classItem._id] !== null && (
                <tr>
                  <td colSpan="7" className="border-0">
                    <div className={`alert ${validationResults[classItem._id] ? 'alert-success' : 'alert-danger'} py-2 mb-0`}>
                      {validationResults[classItem._id] 
                        ? 'Validado correctamente - Puede tomar la clase'
                        : 'Tiene los pagos vencidos - No apto a tomar la clase - Se removerá la inscripción'}
                    </div>
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

export default ClassList;