import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Para hacer llamadas HTTP.
import './Productos.css'; // Importa los estilos para el componente.

function Productos() {
    // Establece estados para productos, categorías, marcas y el nuevo producto.
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [newProduct, setNewProduct] = useState({
        idcategoria: '',
        idmarca: '',
        descripcion: '',
        precio: ''
    });

    // useEffect se ejecutará una vez cuando el componente se monte.
    useEffect(() => {
        fetchProductos();
        fetchCategorias();
        fetchMarcas();
    }, []);

    // Función que obtiene los productos del backend.
    const fetchProductos = async () => {
        const response = await axios.get('http://localhost:3001/productos');
        setProductos(response.data);
    };

    // Función que obtiene las categorías del backend.
    const fetchCategorias = async () => {
        const response = await axios.get('http://localhost:3001/categoria');
        setCategorias(response.data);
    };

    // Función que obtiene las marcas del backend.
    const fetchMarcas = async () => {
        const response = await axios.get('http://localhost:3001/marcas');
        setMarcas(response.data);
    };

    // Función que añade un nuevo producto.
    const addProduct = async () => {
        await axios.post('http://localhost:3001/productos', newProduct);
        fetchProductos();
    };

    // Función que actualiza un producto por su ID.
    const updateProduct = async (id) => {
        await axios.put(`http://localhost:3001/productos/${id}`, newProduct);
        fetchProductos();
    };

    // Función que elimina un producto por su ID.
    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:3001/productos/${id}`);
        fetchProductos();
    };

    // Renderizado del componente.
    return (
        <div className="container">
            {/* Mapea y muestra cada producto */}
            {productos.map(product => (
                <div key={product.idprod} className="producto">
                    <h2>{product.descripcion}</h2>
                    <h3>{product.precio}</h3>
                    <div className="buttons">
                        {/* Botón para eliminar un producto */}
                        <button className='button5' onClick={() => deleteProduct(product.idprod)}>Eliminar</button>
                        {/* Botón para actualizar un producto */}
                        <button className='button5' onClick={() => updateProduct(product.idprod)}>Actualizar</button>
                    </div>
                </div>
            ))}
            <div>
                {/* Desplegable para seleccionar categorías */}
                <select className='' onChange={(e) => setNewProduct({...newProduct, idcategoria: e.target.value})}>
                    <option value="">--Selecciona una categoría--</option>
                    {categorias.map(categoria => <option key={categoria.idcateg} value={categoria.idcateg}>{categoria.categoria}</option>)}
                </select>
                {/* Desplegable para seleccionar marcas */}
                <select onChange={(e) => setNewProduct({...newProduct, idmarca: e.target.value})}>
                    <option value="">--Selecciona una marca--</option>
                    {marcas.map(marca => <option key={marca.idmarca} value={marca.idmarca}>{marca.marca}</option>)}
                </select>
                {/* Campo para ingresar la descripción y precio del producto */}
                <input className="input" type="text" placeholder="Descripción" onChange={(e) => setNewProduct({...newProduct, descripcion: e.target.value})} />
                <input className="input" type="text" placeholder="Precio" onChange={(e) => setNewProduct({...newProduct, precio: e.target.value})} />
                {/* Botón para añadir el nuevo producto */}
                <button className='button5' onClick={addProduct}>Añadir producto</button>
            </div>
        </div>
    );
}

export default Productos;
