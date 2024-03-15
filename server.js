const express = require('express');
const path = require('path');
const axios = require('axios'); // Importa Axios para hacer solicitudes HTTP

const app = express();

// Define la carpeta que contiene los archivos estáticos (por ejemplo, index.html)
const publicDirectoryPath = path.join(__dirname, 'public');

// Configura Express para servir archivos estáticos desde la carpeta public
app.use(express.static(publicDirectoryPath));

// Ruta para manejar la solicitud de búsqueda del superhéroe
app.get('/search/:heroId', async (req, res) => {
    const heroId = req.params.heroId;

    try {
        // Realiza la solicitud a la API de SuperHero
        const response = await axios.get(`https://www.superheroapi.com/api.php/4905856019427443/${heroId}`);

        // Devuelve la respuesta de la API de SuperHero
        res.send(response.data);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        console.error('Error al buscar el superhéroe:', error.message);
        res.status(500).send('Error al buscar el superhéroe. Por favor, inténtalo de nuevo.');
    }
});

// Ruta de inicio para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Define el puerto en el que escuchará el servidor
const port = process.env.PORT || 3000;

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});
