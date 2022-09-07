const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validar-JWT')
const {
    getUsuarios,
    crearUsuario,
    actualizaUsuario,
    borrarUsuario,
} = require('../controllers/usuarios.controllers')

const router = Router()

router.get('/', validarJWT, getUsuarios)

/* Recordar instalar express-validator de npm */
router.post(
    '/',
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
)

router.put(
    '/:id',
    [
        validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('role', 'el role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizaUsuario
)

router.delete('/:id', validarJWT, borrarUsuario)

module.exports = router
