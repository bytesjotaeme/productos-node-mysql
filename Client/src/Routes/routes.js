import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Importa los componentes que se usarán en las rutas.
import Login from "../Pages/Login"
import Register from "../Pages/Register";
import Crud from '../Pages/Crud'

// Verifica si el usuario está logado verificando un ítem del localStorage.
const logado = localStorage.getItem('@user');

const Rutas = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* 
                       Si el usuario no está logueado, se muestra el componente de Login en la ruta principal ("/"). 
                       Además, le pasamos la prop 'logado' para que Login pueda saber si el usuario está logueado o no.
                    */}
                    {!logado && <Route path="/" element={<Login logado={logado} />} />}
                    
                    {/* 
                       Si el usuario está logueado, se muestra el componente Crud en la ruta principal ("/"). 
                      */}
                    {logado && <Route path="/" exact element={<Crud />} />}
                    
                    {/* 
                       Si el usuario no está logado, se muestra el componente de Cadastro en la ruta "/register". 
                       Además, le pasamos la prop 'logado' para que Cadastro pueda saber si el usuario está logueado o no.
                    */}
                    {!logado && <Route path="/register" element={<Register logado={logado} />} />}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

// Exporta el componente Rutas para ser usado en otras partes de la aplicación.
export default Rutas;
