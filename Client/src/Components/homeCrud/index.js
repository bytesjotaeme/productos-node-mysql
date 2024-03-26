import React, { useState, useEffect } from "react";        // React y sus hooks (aunque no se están utilizando aquí, probablemente son residuos de ediciones anteriores)
import './index.css';                                      // Estilos principales
import { TbLogout } from 'react-icons/tb';                 // Ícono de cierre de sesión
import '../../Styles/Card_homeCrud.css';                  // Estilos específicos para este componente

// Definición del componente HomeCrud
export default function HomeCrud() {
  // Función para cerrar sesión
  const sair = () => {
    localStorage.clear();         // Limpia el almacenamiento local, eliminando cualquier dato almacenado allí
    window.location.reload();     // Recarga la página
  }

  // JSX del componente
  return (
    <div className="content">
      <header className="py-3 mb-3 border-bottom">
        <div className="container-fluid d-grid gap-3 align-items-center header-display">
          <div class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown">
            {/* Esta sección está vacía pero mantiene su espacio debido a las clases de estilo */}
          </div>
          <div className="container-fluid d-grid gap-3 align-items-center ">
            <div className="d-flex align-items-center">
              {/* Formulario sin acción específica al enviar. 
                   El uso de 'event.preventDefault()' evita que el formulario se envíe y recargue la página. */}
              <form onSubmit={(event) => { event.preventDefault() }} class="w-100 me-2">
                <div className="search">
                  {/* Nombre o título */}
                  <h1 className="demotext">La Escabioneta</h1>
                  {/* Botón de cierre de sesión con ícono */}
                  <button
                    onClick={sair}
                    className="exit">
                    <TbLogout/>  {/* Ícono de cierre de sesión */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
