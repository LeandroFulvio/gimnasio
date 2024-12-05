import { useState } from 'react';
import axios from 'axios';

function CreateSocio({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/socios', formData);
      setFormData({ name: '', dni: '' });
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error creating socio:', error);
      alert('Error al crear socio');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Nuevo Socio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DNI</label>
          <input
            type="number"
            className="form-control"
            value={formData.dni}
            onChange={(e) => setFormData({...formData, dni: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Socio</button>
      </form>
    </div>
  );
}

export default CreateSocio;