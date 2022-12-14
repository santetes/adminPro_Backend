const { Router } = require('express')
const { check } = require('express-validator')
const {
    login,
    googleSignIn,
    renovarToken,
} = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validar-JWT')

const router = Router()

router.post(
    '/',
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'la contraseña es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    login
)

router.post(
    '/google',
    [check('token', 'El token es obligatorio').not().isEmpty(), validarCampos],
    googleSignIn
)

router.get('/renew', validarJWT, renovarToken)

module.exports = router
