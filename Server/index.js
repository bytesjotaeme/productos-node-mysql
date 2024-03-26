const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const saltRounds = 10;
const { Sequelize } = require('sequelize');

{/*conexion */}
//Creación de la conexión a la base de datos MySQL con el paquete mysql2
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_node_jwt",
});

//Uso de middlewares para analizar el cuerpo JSON de las solicitudes y gestionar CORS
app.use(express.json());
app.use(cors());

//Endpoint para el registro de usuarios

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    //Consulta para verificar si el email ya está en uso

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
     //Si no hay un usuario con ese email, encriptamos la contraseña y registramos al usuario
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuario registrado correctamente" });
          }
        );
      });
    } else {
      res.send({ msg: "Correo electrónico ya registrado" });
    }
  });
});

{/*Verificacion de login*/}
//Endpoint para verificar el inicio de sesión del usuario

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

 //Consulta para obtener el usuario con el email proporcionado

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
     //Si hay un usuario con ese email, comparamos la contraseña proporcionada con la almacenada en la DB
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response === true) {
          res.send(response)
          
        } else {
          res.send({ msg: "Correo o contraseña incorrecta" });
        }
      });
    } else {
      res.send({ msg: "Usuario no registrado" });
    }
  });
});


//crud
//Configuración de Sequelize para operaciones CRUD

const sequelize = new Sequelize('login_node_jwt', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

//Testeo de la conexión a la base de datos con Sequelize

sequelize.authenticate().then(() => console.log('Database connected...')).catch(err => console.error('Unable to connect to the database:', err));

//Definición de modelos con Sequelize

const Categoria = sequelize.define('Categoria', {
  idcateg: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  categoria: Sequelize.STRING
}, {timestamps: false});

const Marca = sequelize.define('Marca', {
  idmarca: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  marca: Sequelize.STRING
}, {timestamps: false});

const Producto = sequelize.define('Producto', {
  idprod: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  idcategoria: Sequelize.INTEGER,
  idmarca: Sequelize.INTEGER,
  descripcion: Sequelize.STRING,
  precio: Sequelize.DECIMAL(10, 2)
}, {timestamps: false});

//Establecer relaciones entre los modelos

Producto.belongsTo(Categoria, {foreignKey: 'idcategoria'});
Producto.belongsTo(Marca, {foreignKey: 'idmarca'});

//Sincronización de los modelos con la base de datos

sequelize.sync();

//Endpoints CRUD para productos, categorias y marcas

app.get('/productos', async (req, res) => {
  const productos = await Producto.findAll({ include: [Categoria, Marca]});
  res.send(productos);
});

app.post('/productos', async (req, res) => {
  const producto = await Producto.create(req.body);
  res.send(producto);
});

app.put('/productos/:idprod', async (req, res) => {
  const producto = await Producto.findByPk(req.params.idprod);
  await producto.update(req.body);
  res.send(producto);
});

app.delete('/productos/:idprod', async (req, res) => {
  const producto = await Producto.findByPk(req.params.idprod);
  await producto.destroy();
  res.send({message: 'Producto eliminado'});
});

app.get('/categoria', async (req, res) => {
  const categorias = await Categoria.findAll();
  res.send(categorias);
});

app.post('/categoria', async (req, res) => {
  const categoria = await Categoria.create(req.body);
  res.send(categoria);
});

app.put('/categoria/:idcateg', async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.idcateg);
  await categoria.update(req.body);
  res.send(categoria);
});

app.delete('/categoria/:idcateg', async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.idcateg);
  await categoria.destroy();
  res.send({message: 'Categoria eliminada'});
});

app.get('/marcas', async (req, res) => {
  const marcas = await Marca.findAll();
  res.send(marcas);
});

app.post('/marcas', async (req, res) => {
  const marca = await Marca.create(req.body);
  res.send(marca);
});

app.put('/marcas/:idmarca', async (req, res) => {
  const marca = await Marca.findByPk(req.params.idmarca);
  await marca.update(req.body);
  res.send(marca);
});

app.delete('/marcas/:idmarca', async (req, res) => {
  const marca = await Marca.findByPk(req.params.idmarca);
  await marca.destroy();
  res.send({message: 'Marca eliminada'});
});

//Endpoint para obtener todas las categorías
app.get('/categoria', async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
});

//Endpoint para obtener todas las marcas
app.get('/marcas', async (req, res) => {
  const marcas = await Marca.findAll();
  res.json(marcas);
});

//inicia el servidor en el puerto 3001
app.listen(3001, () => {
  console.log("andando en el puerto 3001");
});

