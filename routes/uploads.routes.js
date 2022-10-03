const { Router } = require('express')

const {
    fileUpload,
    retornaImagen,
} = require('../controllers/uploads.controller')

const { validarJWT } = require('../middlewares/validar-JWT')

const router = Router()

router.put('/:coleccion/:id', validarJWT, fileUpload)
router.get('/:coleccion/:imagen', retornaImagen)

module.exports = router
