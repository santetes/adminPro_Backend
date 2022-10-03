const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt.helpers')
const { googleVerify } = require('../helpers/google-verify.helpers')

const login = async (req = request, res = response) => {
    const { email, password } = req.body

    try {
        /* Se crea un timer para que cada petición demore un segundo para dificultar el bombardeo de la bbdd */
        setTimeout(async () => {
            // Verificar contraseña---------
            const usuarioDb = await Usuario.findOne({ email })

            if (!usuarioDb) {
                return res.status(404).json({ msg: 'email no encontrado' })
            }

            // Verificar password
            const validPassword = bcrypt.compareSync(
                password,
                usuarioDb.password
            )
            if (!validPassword) {
                return res.status(400).json({ msg: 'Contraseña no es válida' })
            }

            // Generar JWT
            const jwt = await generarJWT(usuarioDb._id)

            return res.status(200).json({ msg: 'ok', jwt })
        }, 1000)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'algo salió mal' })
    }
}

const googleSignIn = async (req = request, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token)

        const usuarioDb = await Usuario.findOne({ email })
        let usuario

        if (!usuarioDb) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '**',
                img: picture,
                google: true,
            })
        } else {
            usuario = usuarioDb
            usuario.google = true
        }

        // Guardar Usuario
        await usuario.save()

        // Generar JWT
        const token = await generarJWT(usuario._id)

        return res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ msg: 'algo salió mal' })
    }
}

const renovarToken = async (req = request, res = response) => {
    const token = await generarJWT(req.uid)
    const usuario = await Usuario.findById(req.uid)
    res.status(200).json({ token, usuario })
}

module.exports = { login, googleSignIn, renovarToken }
