const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validar-JWT')
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
} = require('../controllers/medicos.controller')

const router = Router()

router.get('/', validarJWT, getMedicos)

router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital', 'es necesario indicar un Id válido').isMongoId(),
        validarCampos,
    ],
    crearMedico
)

router.put(
    '/:id',
    [
        validarJWT,
        check('hospital', 'No es un identificador válido mongoId').isMongoId(),
        validarCampos,
    ],
    actualizarMedico
)

router.delete('/:id', validarJWT, borrarMedico)

module.exports = router
