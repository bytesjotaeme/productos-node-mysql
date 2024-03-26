import "../Styles/Login.css";

// Importa bibliotecas y herramientas de validación.
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";

// Importa Axios para realizar peticiones HTTP.
import Axios from "axios";

// Importa una imagen desde el directorio Assets.
import Img from "../SVG/database.svg";

// Importa Link de react-router-dom para navegación entre componentes.
import { Link } from 'react-router-dom';

// Define el componente Login.
function Login({logado=false}) {

  // Función para manejar el proceso de inicio de sesión.
  const handleLogin = (values) => {
    // Realiza una solicitud POST al servidor para iniciar sesión.
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {

      const page = response.data;

      // Si la respuesta del servidor es verdadera, guarda el usuario en el localStorage y recarga la página.
      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        window.location.reload();
      } else {
        // Si no, muestra un mensaje de error.
        alert(response.data.msg);
      }
    });
  };

  // Define las validaciones para el formulario de inicio de sesión.
  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Email invalido")
      .required("Email es obligatorio"),
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es obligatoria"),
  });

  // Renderiza el componente Login.
  return (
    <div className="body">
      <div className="left-login">
        {/* Muestra una imagen */}
        <img src={Img} alt="" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {/* Muestra un enlace a Home si el usuario no ha iniciado sesión */}
              {!logado && <Link to="/">Home</Link>}
            </div>

            <div className="user-link-cad">
              {/* Muestra un enlace a Registro si el usuario no ha iniciado sesión */}
              {!logado && <Link to="/register">Registrarse</Link>}
            </div>
          </div>
          <h1>LOGIN</h1>

          {/* Formulario de inicio de sesión usando Formik */}
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Email</label>
                {/* Campo de Email */}
                <Field name="email" type='email' className="form-field" placeholder="Email" />
                {/* Mensaje de error para el campo Email */}
                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              <div className="form-group">
                <label form="email">Contraseña</label>
                {/* Campo de Contraseña */}
                <Field name="password" type='password' className="form-field" placeholder="Contraseña" />
                {/* Mensaje de error para el campo Contraseña */}
                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              {/* Botón para enviar el formulario */}
              <button className="button" type="submit">
                ENTRAR
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

// Exporta el componente Login para que pueda ser usado en otros archivos.
export default Login;
