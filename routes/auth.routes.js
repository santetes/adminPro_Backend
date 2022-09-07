const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validarCampos')

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

module.exports = router
