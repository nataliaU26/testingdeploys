import React, { useState } from 'react';
import axios from 'axios';

function ExcelUploader() {
  const [file, setFile] = useState(null);
  const [numFilas, setNumFilas] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('archivo', file);
      const response = await axios.post('http://127.0.0.1:5000/procesar_archivo', formData);
      setNumFilas(response.data.num_filas);
      setError(null);
    } catch (error) {
      setNumFilas(null);
      setError('Error al cargar el archivo.');
    }
  };

  return (
    <div>
      <h2>Cargar archivo Excel</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir archivo</button>
      {error && <p>{error}</p>}
      {numFilas && <p>Número de filas del archivo: {numFilas}</p>}
    </div>
  );
}

export default ExcelUploader;
