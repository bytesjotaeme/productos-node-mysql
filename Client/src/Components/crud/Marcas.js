import React, { useEffect, useState } from 'react';   // React y sus hooks
import axios from 'axios';                            // Librería para realizar solicitudes HTTP
import './Marcas.css';                                // Estilos para el componente

function Marcas() {
    // Estados locales del componente
    const [marcas, setMarcas] = useState([]);                // Array para las marcas
    const [newMarca, setNewMarca] = useState({ marca: '' }); // Objeto para la nueva marca a añadir o actualizar

    // useEffect que se ejecuta una vez (al montarse el componente) para obtener las marcas
    useEffect(() => {
        fetchMarcas();
    }, []);

    // Función para obtener las marcas desde el servidor
    const fetchMarcas = async () => {
        const response = await axios.get('http://localhost:3001/marcas');
        setMarcas(response.data);
    };

    // Función para añadir una nueva marca al servidor
    const addMarca = async () => {
        await axios.post('http://localhost:3001/marcas', newMarca);
        fetchMarcas(); // Refrescar la lista de marcas después de añadir
    };

    // Función para actualizar una marca existente en el servidor
    const updateMarca = async (id) => {
        await axios.put(`http://localhost:3001/marcas/${id}`, newMarca);
        fetchMarcas(); // Refrescar la lista después de actualizar
    };

    // Función para eliminar una marca del servidor
    const deleteMarca = async (id) => {
        await axios.delete(`http://localhost:3001/marcas/${id}`);
        fetchMarcas(); // Refrescar la lista después de eliminar
    };

    // El JSX que renderiza el componente
    return (
        <div className="container">
            {/* Iteración sobre las marcas y su visualización */}
            {marcas.map(marca => (
                <div key={marca.idmarca} className="marca">
                    <h2>{marca.marca}</h2>
                    <div className="buttons">
                        {/* Botones para eliminar y actualizar */}
                        <button className='button5' onClick={() => deleteMarca(marca.idmarca)}>Eliminar</button>
                        <button className='button5' onClick={() => updateMarca(marca.idmarca)}>Actualizar</button>
                    </div>
                </div>
            ))}
            {/* Sección para añadir nuevas marcas */}
            <div>
                <input className="input" type="text" placeholder="Marca" onChange={(e) => setNewMarca({...newMarca, marca: e.target.value})}/>
                <button className='button5' onClick={addMarca}>Añadir marca</button>
            </div>
        </div>
    );
}

// Exportación del componente para su uso en otros archivos.
export default Marcas;
