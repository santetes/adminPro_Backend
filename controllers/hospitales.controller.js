const Hospital = require('../models/hospital.model')
const { request, response } = require('express')

const getHospitales = async (req = request, res = response) => {
    const hospitales = await Hospital.find().populate('usuario', [
        'nombre',
        'img',
    ])

    res.status(200).json({ msg: 'get ok', hospitales })
}
const crearHospital = async (req = request, res = response) => {
    const hospital = new Hospital(req.body)
    const uid_validadacionJWT = req.uid
    hospital.usuario = uid_validadacionJWT
    try {
        const hospitalDB = await hospital.save()
        res.status(200).json({ msg: 'crear ok', hospitalDB })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'algo salió mal' })
    }
}
const actualizarHospital = (req = request, res = response) => {
    res.status(200).json({ msg: 'actualizar ok' })
}
const borrarHospital = (req = request, res = response) => {
    res.status(200).json({ msg: 'borrar ok' })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
}
