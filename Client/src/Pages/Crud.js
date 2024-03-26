import React from 'react';

// Importar componentes para ser usados en este archivo.
import HomeCrud from '../Components/homeCrud';
import Productos from '../Components/crud/Productos';
import Categorias from '../Components/crud/Categorias';
import Marcas from '../Components/crud/Marcas';

// Definir y exportar un componente de React llamado Crud.
export default function Crud(){

    // Lo que se retorna aquí es lo que se renderizará cuando este componente sea utilizado.
    return(
        /*
        <div>
            <HomeCrud/>
        </div>
        */
        // El siguiente bloque muestra cuatro componentes: HomeCrud, Productos, Categorias y Marcas.
        <div>
            <HomeCrud/>
            <Productos/>
            <Categorias/>
            <Marcas/>
        </div>
    );
}
