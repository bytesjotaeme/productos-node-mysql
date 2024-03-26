import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Para hacer llamadas HTTP.
import './Categorias.css'; // Importa los estilos para el componente.

function Categorias() {
    // Estado para almacenar las categorías.
    const [categorias, setCategorias] = useState([]);
    // Estado para almacenar la nueva categoría ingresada por el usuario.
    const [newCategoria, setNewCategoria] = useState({ categoria: '' });

    // useEffect se ejecutará una vez cuando el componente se monte.
    useEffect(() => {
        fetchCategorias();
    }, []);

    // Función que obtiene las categorías del backend.
    const fetchCategorias = async () => {
        const response = await axios.get('http://localhost:3001/categoria');
        setCategorias(response.data);
    };

    // Función que añade una nueva categoría.
    const addCategoria = async () => {
        await axios.post('http://localhost:3001/categoria', newCategoria);
        fetchCategorias();
    };

    // Función que actualiza una categoría por su ID.
    const updateCategoria = async (id) => {
        await axios.put(`http://localhost:3001/categoria/${id}`, newCategoria);
        fetchCategorias();
    };

    // Función que elimina una categoría por su ID.
    const deleteCategoria = async (id) => {
        await axios.delete(`http://localhost:3001/categoria/${id}`);
        fetchCategorias();
    };

    // Renderizado del componente.
    return (
        <div className="container">
            {/* Mapea y muestra cada categoría */}
            {categorias.map(categoria => (
                <div key={categoria.idcateg} className="categoria">
                    <h2>{categoria.categoria}</h2>
                    <div className="buttons">
                        {/* Botón para eliminar una categoría */}
                        <button className='button5' onClick={() => deleteCategoria(categoria.idcateg)}>Eliminar</button>
                        {/* Botón para actualizar una categoría */}
                        <button className='button5' onClick={() => updateCategoria(categoria.idcateg)}>Actualizar</button>
                    </div>
                </div>
            ))}
            <div>
                {/* Campo para ingresar una nueva categoría */}
                <input className="input" type="text" placeholder="Categoría" onChange={(e) => setNewCategoria({...newCategoria, categoria: e.target.value})}/>
                {/* Botón para añadir la nueva categoría */}
                <button className='button5' onClick={addCategoria}>Añadir categoría</button>
            </div>
        </div>
    );
}

export default Categorias;
