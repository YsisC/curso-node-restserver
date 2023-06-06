const express = require('express');
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Conetar a base de datos
        this.conectarDB()

        // Midleware
        this.middleware();
        this.routes();

    }

    async conectarDB() {
        await dbConnection()
    }

    middleware() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))
    }
    routes() {

        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`)
        });
    }
}

module.exports = Server