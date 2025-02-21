import { useState, useEffect } from 'react';
import paymentService from './services/PaymentService';

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
      const response = await paymentService.getSocioPayment(socioId);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await paymentService.createPayment({
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
        await paymentService.deletePayment(id);
        setPayments(payments.filter(payment => payment._id !== id));
      } catch (error) {
        console.error('Error deleting payment:', error);
        alert('Error al eliminar el pago');
      }
    }
  };

  const calculateEndDate = (startDate, type) => {
    if (!startDate) return '';
    
    const date = new Date(startDate);
    switch (type) {
      case 'Diario':
        return new Date(date.setDate(date.getDate() + 1)).toISOString().split('T')[0];
      case 'Semanal':
        return new Date(date.setDate(date.getDate() + 7)).toISOString().split('T')[0];
      case 'Quincenal':
        return new Date(date.setDate(date.getDate() + 15)).toISOString().split('T')[0];
      case 'Mensual':
        return new Date(date.setMonth(date.getMonth() + 1)).toISOString().split('T')[0];
      case 'Semestral':
        return new Date(date.setMonth(date.getMonth() + 6)).toISOString().split('T')[0];
      case 'Anual':
        return new Date(date.setFullYear(date.getFullYear() + 1)).toISOString().split('T')[0];
      default:
        return '';
    }
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    const endDate = calculateEndDate(startDate, newPayment.type);
    setNewPayment({
      ...newPayment,
      startDate,
      endDate
    });
  };
  
  const handleTypeChange = (e) => {
    const type = e.target.value;
    const endDate = calculateEndDate(newPayment.startDate, type);
    setNewPayment({
      ...newPayment,
      type,
      endDate
    });
  };

  const isPaymentActive = (payment) => {
    const now = new Date();
    const startDate = new Date(payment.startDate);
    const endDate = new Date(payment.endDate);
    return startDate <= now && endDate >= now;
  };
  
  return (
    <div className="container mt-4">
      <h3>Gestión de Pagos</h3>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <select className="form-control" value={newPayment.type}
              onChange={handleTypeChange} >
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
              onChange={handleStartDateChange}
              placeholder="Fecha inicio"
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={newPayment.endDate}
              disabled
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
              <td>{isPaymentActive(payment) ? 'Activo' : 'Expirado'}</td>
              <td>
                <button onClick={() => handleDelete(payment._id)}
                  className="btn btn-danger btn-sm" >
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