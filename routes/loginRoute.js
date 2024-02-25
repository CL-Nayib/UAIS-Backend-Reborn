const express = require('express');
const connection = require("../connection");
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
// Generación de token

connection.then(connection => {

   router.post('/login', authController.validarCredenciales(connection));

}).catch(error => {
   console.error('Error obteniendo la conexión:', error);
});

module.exports = router;