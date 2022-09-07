const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next) => {
    // Leer el token de los headers
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({ msg: 'no existe token en la petición' })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid //introducimos en la petición en valor del uid para saber que usuario ha realizado la petición
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'token incorrecto' })
    }
}

module.exports = { validarJWT }
