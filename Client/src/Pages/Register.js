// Importa los estilos específicos del componente Cadastro.
import "../Styles/Cadastro.css"

// Importa una imagen de una base de datos.
import Img from "../SVG/database.svg"

// Importa la biblioteca 'yup' completa que se usa para validaciones.
import * as yup from "yup";

// Importa varios componentes y funciones de la biblioteca 'formik' que se usa para la gestión de formularios en React.
import { ErrorMessage, Formik, Form, Field } from "formik";

// Importa Axios, una biblioteca para hacer solicitudes HTTP.
import Axios from "axios";

// Importa el componente Link de 'react-router-dom' que permite enlazar a otras rutas/páginas.
import { Link } from 'react-router-dom';

// Define el componente 'Cadastro' que tiene un prop 'logado' con un valor predeterminado de 'false'.
function Register({ logado = false }) {

    // Define una función para manejar el registro.
    const handleRegister = (values) => {
        // Realiza una petición POST con Axios al servidor local para registrar a un usuario.
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            // Alerta con el mensaje de respuesta del servidor.
            alert(response.data.msg);
            // Registra la respuesta completa en la consola.
            console.log(response);
            // Recarga la página.
            window.location.reload();
        });
    };

    // Define las reglas de validación para el formulario de registro usando 'yup'.
    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("E-mail invalido")
            .required("Email es obligatorio"),
        password: yup
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .required("La contraseña es obligatoria"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Las contraseñas son diferentes.")
            .required("La confirmación de la contraseña es obligatoria."),
    });

    // Renderiza el componente.
    return (
        <div className="body">
            <div className="left-cadastro">
                {/* Muestra una imagen.*/}
                <img src={Img} alt="" className="chart" />
            </div>
            <div className="right-cadastro">
                <div className="card-cadastro">
                    <div className="user-links">
                        <div className="user-link-home">
                            {/* Si el usuario no está logado, muestra un enlace a la página principal.*/}
                            {!logado && <Link to="/">Home</Link>}
                        </div>

                        <div className="user-link-cad">
                            {/* Si el usuario no está logado, muestra un enlace a la página de registro.*/}
                            {!logado && <Link to="/register">Registrarse</Link>}
                        </div>
                    </div>
                    {/* Título del formulario.*/}
                    <h1>REGISTRARSE</h1>

                    {/* Usa Formik para manejar el formulario.*/}
                    <Formik
                        initialValues={{}}
                        onSubmit={handleRegister}
                        validationSchema={validationsRegister}
                    >
                        {/* Define la estructura del formulario.*/}
                        <Form className="login-form">
                            {/* Campo de correo electrónico.*/}
                            <div className="form-group">
                                <label form="email">Email</label>
                                <Field name="email" type='email' className="form-field" placeholder="Email" />
                                {/* Muestra errores de validación para el campo de correo electrónico.*/}
                                <ErrorMessage
                                    component="span"
                                    name="email"
                                    className="form-error"
                                />
                            </div>

                            {/* Campo de contraseña.*/}
                            <div className="form-group">
                                <label form="email">Contraseña</label>
                                <Field name="password" type='password' className="form-field" placeholder="Contraseña" />
                                {/* Muestra errores de validación para el campo de contraseña.*/}
                                <ErrorMessage
                                    component="span"
                                    name="password"
                                    className="form-error"
                                />
                            </div>

                            {/*Campo de confirmación de contraseña.*/}
                            <div className="form-group">
                                <label form="email">Confirme su contraseña</label>
                                <Field name="confirmation" type='password' className="form-field" placeholder="Contraseña" />
                                {/*Muestra errores de validación para el campo de confirmación de contraseña.*/}
                                <ErrorMessage
                                    component="span"
                                    name="confirmation"
                                    className="form-error"
                                />
                            </div>

                            {/*Botón para enviar el formulario.*/}
                            <button className="button" type="submit">
                                REGISTRARSE
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

// Exporta el componente 'Cadastro' para poder usarlo en otros archivos.
export default Register;
