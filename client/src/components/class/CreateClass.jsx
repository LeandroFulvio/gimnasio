import { useState } from 'react';
import axios from 'axios';

function CreateClass({ onClassCreated }) {
  const [classForm, setClassForm] = useState({
    name: '',
    professor: '',
    schedule: '',
    capacity: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/classes', classForm);
      setClassForm({ name: '', professor: '', schedule: '', capacity: '' });

      //update view
      if (onClassCreated) {
        onClassCreated();
      }

    } catch (error) {
      console.error('Error creando la clase:', error);
      alert('Error al crear la clase');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrar Clase</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de la Clase</label>
          <input
            type="text"
            className="form-control"
            value={classForm.name}
            onChange={(e) => setClassForm({...classForm, name: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Profesor</label>
          <input
            type="text"
            className="form-control"
            value={classForm.professor}
            onChange={(e) => setClassForm({...classForm, professor: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Horario</label>
          <input
            type="text"
            className="form-control"
            value={classForm.schedule}
            onChange={(e) => setClassForm({...classForm, schedule: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Capacidad</label>
          <input
            type="number"
            className="form-control"
            value={classForm.capacity}
            onChange={(e) => setClassForm({...classForm, capacity: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Clase</button>
      </form>
    </div>
  );
}

export default CreateClass;