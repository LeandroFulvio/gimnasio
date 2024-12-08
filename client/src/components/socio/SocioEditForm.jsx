// SocioEditForm.jsx
import React, { useState, useEffect } from 'react';

function SocioEditForm({ socio, onUpdate, onCancel }) {
  const [editForm, setEditForm] = useState({
    name: '',
    dni: '',
    active: true
  });

  useEffect(() => {
    if (socio) {
      setEditForm({
        name: socio.name,
        dni: socio.dni,
        active: socio.active
      });
    }
  }, [socio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editForm);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
          className="form-control form-control-sm"
          required
        />
      </td>
      <td>
        <input
          type="text"
          value={editForm.dni}
          onChange={(e) => setEditForm({...editForm, dni: e.target.value})}
          className="form-control form-control-sm"
          required
        />
      </td>
      <td>
        <select
          value={editForm.active}
          onChange={(e) => setEditForm({...editForm, active: e.target.value === 'true'})}
          className="form-control form-control-sm"
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </select>
      </td>
      <td>{socio?.enrolledClasses?.length || 0} clases</td>
      <td>
        <button onClick={handleSubmit} className="btn btn-success btn-sm me-2">
          Guardar
        </button>
        <button onClick={onCancel} className="btn btn-secondary btn-sm">
          Cancelar
        </button>
      </td>
    </tr>
  );
}

export default SocioEditForm;