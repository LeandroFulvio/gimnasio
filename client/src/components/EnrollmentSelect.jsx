import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function EnrollmentSelect({ socioId, onEnrollmentComplete, refreshTrigger }) {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, [refreshTrigger]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching clases:', error);
    }
  };

  const handleEnroll = async () => {
    if (!selectedClassId) {
      alert('Por favor seleccione una clase');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:5050/api/socios/${socioId}/enroll/${selectedClassId}`);

      setSelectedClassId('');
      if (onEnrollmentComplete) {
        onEnrollmentComplete();
      }
    } catch (error) {
      console.error('Error en la inscripción:', error);
      alert(error.response?.data?.message || 'Error al inscribir al socio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <select 
        className="form-select form-select-sm"
        value={selectedClassId}
        onChange={(e) => setSelectedClassId(e.target.value)}
        disabled={loading}
      >
        <option value="">Seleccionar clase</option>
        {classes.map(classItem => (
          <option key={classItem._id} value={classItem._id}>
            {classItem.name} - {classItem.schedule} - 
            ({classItem.enrolled?.length || 0}/{classItem.capacity})
          </option>
        ))}
      </select>
      <button
        onClick={handleEnroll}
        className="btn btn-success btn-sm"
        disabled={!selectedClassId || loading}
      >
        {loading ? 'Inscribiendo...' : 'Inscribir'}
      </button>
    </div>
  );
}

EnrollmentSelect.propTypes = {
  socioId: PropTypes.string.isRequired,
  onEnrollmentComplete: PropTypes.func,
  refreshTrigger: PropTypes.number
};

export default EnrollmentSelect;