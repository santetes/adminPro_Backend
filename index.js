const express = require('express')
const dbConexion = require('./database/config')
require('dotenv').config()
const cors = require('cors')

// Crear el servidor express
const app = express()

// Conexión de la BBDD
dbConexion()

/* ---------------MIDDLEWARES------------- */

// Configurar Cors
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/login', require('./routes/auth.routes'))

/* -------------------------------------- */

app.listen(process.env.PORT, () =>
    console.log('servidor corriendo en el puerto ', process.env.PORT)
)
