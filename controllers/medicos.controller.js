const Medico = require('../models/medico.model')
const { request, response } = require('express')

const getMedicos = async (req = request, res = response) => {
    const medicos = await Medico.find()
        .populate('usuario', ['nombre', 'img'])
        .populate('hospital', ['nombre', 'img'])

    res.status(200).json({ msg: 'get ok', medicos })
}
const crearMedico = async (req = request, res = response) => {
    const uid_validadacionJWT = req.uid
    const medico = new Medico(req.body)
    medico.usuario = uid_validadacionJWT

    try {
        const medicoBD = await medico.save()
        res.status(200).json({ msg: 'crear ok', medicoBD })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'algo salió mal' })
    }
}
const actualizarMedico = (req = request, res = response) => {
    res.status(200).json({ msg: 'actualizar ok' })
}
const borrarMedico = (req = request, res = response) => {
    res.status(200).json({ msg: 'borrar ok' })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}
