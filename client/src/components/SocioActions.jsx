import React from 'react';
import PropTypes from 'prop-types';

import EnrollmentSelect from './EnrollmentSelect';

function SocioActions({ 
  socio, 
  onEdit, 
  onDelete, 
  onTogglePayments, 
  showingPayments,
  refreshTrigger,
  onEnrollmentComplete  
}) {

  return (
    <div className="d-flex flex-column gap-2">
      <div className="btn-group">
        <button 
          onClick={() => onEdit(socio)}
          className="btn btn-primary btn-sm"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(socio._id)}
          className="btn btn-danger btn-sm"
        >
          Eliminar
        </button>
        <button
          onClick={() => onTogglePayments(socio._id)}
          className="btn btn-info btn-sm"
        >
          {showingPayments ? 'Ocultar Pagos' : 'Ver Pagos'}
        </button>
      </div>
      
      <div className="mt-1">
        <EnrollmentSelect 
          socioId={socio._id}
          onEnrollmentComplete={onEnrollmentComplete}
          refreshTrigger={refreshTrigger}
        />
      </div>
    </div>
  );
}

//Validaciones de tipos
SocioActions.propTypes = {
  socio: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dni: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    refreshTrigger: PropTypes.number,
    onEnrollmentComplete: PropTypes.func
  }).isRequired,

  //Validaciones de funciones - Deben existir
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTogglePayments: PropTypes.func.isRequired,
  showingPayments: PropTypes.bool.isRequired
};

export default SocioActions;