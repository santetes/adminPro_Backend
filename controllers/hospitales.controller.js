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
const actualizarHospital = async (req = request, res = response) => {
    const hospital = await Hospital.findById(req.params.id)

    try {
        if (!hospital) {
            return res.status(400).json({
                msg: 'No existe ningún hospital con ese identificador',
            })
        }

        hospital.nombre = req.body.nombre ?? hospital.nombre
        hospital.usuario = req.uid

        console.log(hospital)

        await hospital.save()

        res.status(200).json({ msg: 'actualizar ok', hospital })
    } catch (error) {
        console.log('algo salió mal :(')
    }
}
const borrarHospital = async (req = request, res = response) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id)
        if (!hospital) {
            return res
                .status(404)
                .json({ msg: 'no se ha encontrado ningún hospital con ese Id' })
        } else {
            return res.status(200).json({ msg: 'Borrado!!!' })
        }
    } catch (error) {
        console.log('algo salió mal :(')
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
}
