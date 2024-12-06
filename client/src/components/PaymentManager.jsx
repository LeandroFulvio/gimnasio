import { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentManager({ socioId }) {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    type: 'Mensual',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  useEffect(() => {
    fetchPayments();
  }, [socioId]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/payments/socio/${socioId}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/payments', {
        ...newPayment,
        socioId
      });
      setPayments([...payments, response.data]);
      setNewPayment({
        type: 'Mensual',
        startDate: '',
        endDate: '',
        status: 'active'
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Error al crear el pago');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar este pago?')) {
      try {
        await axios.delete(`http://localhost:5050/api/payments/${id}`);
        setPayments(payments.filter(payment => payment._id !== id));
      } catch (error) {
        console.error('Error deleting payment:', error);
        alert('Error al eliminar el pago');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>Gestión de Pagos</h3>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <select className="form-control" value={newPayment.type}
              onChange={(e) => setNewPayment({...newPayment, type: e.target.value})} >
              <option value="Diario">Diario</option>
              <option value="Semanal">Semanal</option>
              <option value="Quincenal">Quincenal</option>
              <option value="Mensual">Mensual</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={newPayment.startDate}
              onChange={(e) => setNewPayment({...newPayment, startDate: e.target.value})}
              placeholder="Fecha inicio"
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={newPayment.endDate}
              onChange={(e) => setNewPayment({...newPayment, endDate: e.target.value})}
              placeholder="Fecha fin"
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary">
              Agregar Pago
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.type}</td>
              <td>{new Date(payment.startDate).toLocaleDateString()}</td>
              <td>{new Date(payment.endDate).toLocaleDateString()}</td>
              <td>{payment.status === 'active' ? 'Activo' : 'Expirado'}</td>
              <td>
                <button
                  onClick={() => handleDelete(payment._id)}
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

export default PaymentManager;