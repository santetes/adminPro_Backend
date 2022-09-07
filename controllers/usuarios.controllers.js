const Usuario = require('../models/usuario.model')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt.helpers')
const { request, response } = require('express')

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find()

    res.json({ msg: 'get usuario', usuarios, uid: req.uid })
}
const crearUsuario = async (req = request, res = response) => {
    const { email, password } = req.body

    try {
        const usuarioEnBBDD = await Usuario.findOne({ email })

        if (usuarioEnBBDD) {
            return res.status(400).json({
                msg: 'El usuario ya se encuentra en la bbdd',
            })
        } else {
            const usuario = new Usuario(req.body)

            // Encriptar contraseña
            const salt = bcrypt.genSaltSync()
            usuario.password = bcrypt.hashSync(password, salt)

            // guardamos en bbdd
            await usuario.save()

            // generamos jwt
            const token = await generarJWT(usuario._id)

            return res
                .status(200)
                .json({ msg: 'usuario guardado en la bbdd', token })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'algo salió mal' })
    }
}

const actualizaUsuario = async (req = request, res = response) => {
    // TODO: validar token y comprobar si es usuario correcto
    const uid = req.params.id
    try {
        const usuarioDb = await Usuario.findById(uid)
        if (!usuarioDb) {
            return res
                .status(404)
                .json({ msg: 'No existe ningún usuario con la id indicada' })
        }

        const { password, google, ...campos } = req.body

        // Comprobamos si no existe un usuario en bbdd con el mismo email por el que queremos actualizar
        // respetando que el propio usuario que va a ser modificado pueda mantener su email
        const emailRepetido = await Usuario.findOne({ email: campos.email })

        if (emailRepetido && usuarioDb.email != campos.email) {
            return res
                .status(404)
                .json({ msg: 'ya exsiste en la bbdd un usuario con ese email' })
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            uid,
            campos,
            { returnDocument: 'after' }
        )

        res.json({ msg: 'ok', usuarioActualizado })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'algo salió mal :(' })
    }
}

const borrarUsuario = async (req = request, res = response) => {
    const uid = req.params.id

    try {
        const usuarioBd = await Usuario.findByIdAndDelete(uid)
        if (!usuarioBd) {
            return res.status(404).json({
                msg: 'no existe usuario en la bbdd con el id indicado',
            })
        }

        res.status(200).json({ msg: 'borrado' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'ocurrió algún problema' })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizaUsuario,
    borrarUsuario,
}
