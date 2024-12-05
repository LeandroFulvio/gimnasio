import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { deleteRecord, fetchRecords, insertRecord } from './service/recordsService';

function Home() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchRecords();
            setRecords(data);
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeleteClick = async (id) => {
        await deleteRecord(id)
        setRecords((prevRecords) => {
            return prevRecords.filter(record => record._id !== id);
        });
    };

    const handleCreateClick = async () => {
        const newRecord = await insertRecord({ name, position })
        setRecords((prevRecords) => [...prevRecords, newRecord])
        setName("")
        setPosition("")
    };

    const handleEditClick = (id) => {

    };

    return (
        <>
            <div className="container align-items-start pt-5 col-md-6">
                <h2 className="row mb-4">Crear Registro</h2>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="nombre" className="row form-label">Nombre:</label>
                        <input type="text" className="form-control" id="nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="posicion" className="row form-label">Posición:</label>
                        <input type="text" className="form-control" id="posicion" value={position} onChange={(e) => setPosition(e.target.value)} required />
                    </div>
                    <button className="btn btn-outline-primary" type="button" onClick={handleCreateClick} >
                        Crear Registro
                    </button>
                </form>
            </div>

            <div className="container mt-5">
                <h2 className="mb-4">Records</h2>
                <div className="row">
                    {records.map((record) => (
                        <div key={record._id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{record.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Position: {record.position}</h6>
                                    <p className="card-text"><strong>ID:</strong> {record._id}</p>
                                    <div className='col'>
                                        <button className="btn btn-outline-danger" onClick={() => handleDeleteClick(record._id)}>Borrar</button>
                                        <Link to={`/edit/${record._id}`} className="btn btn-primary ms-4">Editar</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home