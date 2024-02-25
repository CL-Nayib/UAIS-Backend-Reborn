const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Generación de token
function generarToken(matricula, rol) {
   const token = jwt.sign({ matricula, rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
   return token;
}

//Validación de credenciales
function validarCredenciales(connection) {
   return async (req, res) => {
      console.log('Realizando inicio de sesion...');
      const { matricula, contrasenia } = req.body;
      console.log('Intentando iniciar sesion con la matricula ', matricula);
      query = 'SELECT * FROM usuarios WHERE matricula = ? AND contrasenia = ?';

      connection.query(query, [matricula, contrasenia], (err, result) => {
         console.log('Verificando existencia del usuario');
         if (err) {
            console.log(err);
            return res.status(500).json({ message: 'error en la base de datos' });
         }

         if (result.length > 0) {
            const { matricula, rol } = result[0];
            const token = generarToken(matricula, rol);
            res.json({ mensaje: 'Inicio de sesión exitoso', token, rol });
            /*
            //Credenciales validas
            res.json({ message: 'Inicio de sesion exitoso' });*/ //aqui esto era lo original sin jwt
         } else {
            res.status(401).json({ message: 'Credenciales invalidas' });
         }
      });
   };
}

module.exports = { validarCredenciales };
