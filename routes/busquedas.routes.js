const { Router } = require('express')
const {
    busquedaTodo,
    busquedaPorColeccion,
} = require('../controllers/busquedas.controller')
const { validarJWT } = require('../middlewares/validar-JWT')

const router = Router()

router.get('/:termino', validarJWT, busquedaTodo)

router.get('/coleccion/:tabla/:termino', validarJWT, busquedaPorColeccion)

module.exports = router
