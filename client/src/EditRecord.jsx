import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchRecord, updateRecord } from './service/recordsService'; // Asegúrate de crear estas funciones

function EditRecord() {
  const { id } = useParams(); 
  const [record, setRecord] = useState({ name: '', position: '' });
  const navigate = useNavigate();

  // Cargar el registro cuando se monta el componente
  useEffect(() => {
    const getRecord = async () => {
      const fetchedRecord = await fetchRecord(id); // Suponiendo que tienes una función para obtener el registro
      setRecord(fetchedRecord);
    };
    getRecord();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateRecord(id, record); // Función para actualizar el registro
    navigate('/'); // Redirige a la página principal después de editar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  return (
    <div className="container col-6">
      <h2 className='pt-5'>Editar Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="name"
            value={record.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="posicion" className="form-label">Posición:</label>
          <input
            type="text"
            className="form-control"
            id="posicion"
            name="position"
            value={record.position}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default EditRecord;

