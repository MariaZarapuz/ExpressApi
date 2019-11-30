const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Hola mundo');

});


const port = 3000;

app.listen(port, () => {
    console.log('Escuchando en http://localhost:', port);
})