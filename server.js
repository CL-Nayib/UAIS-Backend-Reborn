require('dotenv').config();             //Lee el archivo .env y lo pone en process.env
const http = require('http');           //Importa el módulo http
const app = require('./index');    //Importa el archivo index.js

const server = http.createServer(app);  //Crea el servidor con el archivo index.js

app.get('/', (req, res) => {            //Crea la ruta raíz
res.send('¡Hola, soy el proyecto de node js para la UAIS!');
});

server.listen(process.env.PORT, process.env.HOST, () => {  //Lee el puerto del archivo .env
    console.log('Server is running on http://localhost:' + process.env.PORT);
  });
