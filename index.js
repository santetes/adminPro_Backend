const express = require('express')
const cors = require('cors')
const expressFileUpload = require('express-fileupload')
const dbConexion = require('./database/config')
require('dotenv').config()

// Crear el servidor express
const app = express()

// Conexión de la BBDD
dbConexion()

/* ---------------MIDDLEWARES------------- */

// Configurar Cors
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// Preparamos la aplicación para poser subir archivos
app.use(expressFileUpload())

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/hospital', require('./routes/hospitales.routes'))
app.use('/api/medico', require('./routes/medicos.routes'))
app.use('/api/total', require('./routes/busquedas.routes'))
app.use('/api/uploads', require('./routes/uploads.routes'))

/* -------------------------------------- */

app.listen(process.env.PORT, () =>
    console.log('servidor corriendo en el puerto ', process.env.PORT)
)
