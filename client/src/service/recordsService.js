
export const insertRecord = async (record) => {
  try {
    const response = await fetch('http://localhost:5050/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const newRecord = await response.json();
    return newRecord;
  } catch (error) {
    console.error('Hubo un problema con la petición fetch:', error);
    throw error;
  }
}

export const updateRecord = async (id, updatedRecord) => {
  const response = await fetch(`http://localhost:5050/record/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedRecord),
  });

  if (!response.ok) {
    throw new Error('No se pudo actualizar el registro');
  }
  return await response.json();
};

// MUY IMPORTANTE USAR ASYNC SINO ROMPE TODO
export const deleteRecord = async (id) => {
  try {
    const response = await fetch(`http://localhost:5050/record/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
  } catch (error) {
    console.error('Hubo un problema con la petición fetch:', error);
    throw error; // Lanzar el error para que pueda ser manejado en otro lugar
  }
};

export const fetchRecords = async () => {
    try {
        const response = await fetch('http://localhost:5050/record', {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
          })
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error en fetchRecords:', error);
        throw error; // Vuelve a lanzar el error para manejarlo en el componente
      }
  }

  export const fetchRecord = async (id) => {
    try {
        const response = await fetch(`http://localhost:5050/record/${id}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
          })
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error en fetchRecords:', error);
        throw error; 
      }
  }