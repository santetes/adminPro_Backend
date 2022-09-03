const express = require('express')
const dbConexion = require('./database/config')
require('dotenv').config()
const cors = require('cors')

// Crear el servidor express
const app = express()

// Configurar Cors
app.use(cors())

// Conexión BBDD
dbConexion()

// Rutas
app.get('/', (req, res) => {
    res.json({ ok: true, msg: 'Hola mundo' })
})

app.listen(process.env.PORT, () =>
    console.log('servidor corriendo en el puerto ', process.env.PORT)
)
