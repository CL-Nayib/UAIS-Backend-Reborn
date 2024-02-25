const express = require('express');                 //Importa el módulo express
const cors = require('cors');                       //Importa el módulo cors

const connection = require('./connection');
const userRoute = require('./routes/userRoute');
const app = express();                              //Crea la aplicación express
const loginRoute = require("./routes/loginRoute");
const jwt = require('jsonwebtoken');

app.use(cors());                                    //Usa cors, para que no haya problemas con el puerto
app.use(express.urlencoded({ extended: true }));      //Para que pueda leer los datos que se envían desde el formulario
app.use(express.json());                            //Para que pueda leer los datos que se envían desde el formulario
app.use('/userRoute', userRoute);                   //Define la ruta para registrar un usuario
app.use(loginRoute);                                //Define la ruta para iniciar sesion

// Ruta protegida que requiere un token válido y el rol adecuado
app.get('/profesional', verificarToken, verificarRol(1), (req, res) => {
   res.json({ mensaje: 'Ruta protegida, acceso permitido' });
});



function verificarToken(req, res, next) {
   const token = req.header('Authorization');

   if (!token) {
      return res.status(401).json({ mensaje: 'Token no proporcionado' });
   }

   jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
         return res.status(401).json({ mensaje: 'Token no válido' });
      }

      req.matricula = decoded.matricula;
      req.rol = decoded.rol;
      next();
   });
}

function verificarRol(rol) {
   return (req, res, next) => {
      if (req.rol === rol) {
         next();
      } else {
         res.status(403).json({ mensaje: 'Acceso no autorizado' });
      }
   };
}


module.exports = app; //Exporta la aplicación express