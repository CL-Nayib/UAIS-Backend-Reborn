const express = require('express');         //Importa el módulo express
const connection = require('../connection'); //Importa el módulo de conexión
const router = express.Router();            //Crea el objeto router
const mysql = require('mysql');

connection.then(connection => {
    router.post('/nuevoPaciente', (req, res) =>{       //Define la ruta para registrar al paciente
        console.log('Registrando al usuario...');


        
        let user = req.body;
        console.log(user);
        checkEmailQuery = `SELECT email, matricula FROM usuarios WHERE email = ?`;
        connection.query(checkEmailQuery, [user.email],(err, result) => {
            console.log('Verificando si el correo ya está registrado...')
            if (!err){ // si no hay un error en la consulta
                if(result.length <= 0){ //si no hay un usuario con ese correo
                    query = `INSERT INTO usuarios (nombre, email, matricula, contrasenia, area_id) VALUES (?, ?, ?, ?, ?)`;
                    connection.query(query, [user.nombre, user.email, user.matricula, user.contrasenia, user.area_id], (err, result) => {
                        if(!err){ //Si no hubo error al registrar el usuario
                            console.log('Usuario registrado correctamente');
                            return res.status(201).json({
                                message: 'Usuario registrado correctamente'
                            });
                        }else{ //Si hubo error al registrar el usuario
                            console.log('Error al registrar al usuario');
                            return res.status(400).json({
                                message: 'Algun dato es incorrecto',
                                error: err
                            });
                        }
                    });
                }else{ 
                    return res.status(400).json({
                        message: 'Ya existe un usuario con ese correo o matricula',
                        error: err
                    });
                }
            }else{ //si hay un error en la consulta
                return res.status(500).json({
                    message: 'Error de servidor',
                    error: err
                });
            }
        });
    });                 
}).catch(error => {
    console.error('Error obteniendo la conexión:', error);
});

module.exports = router;