const Medico = require('../models/medico.model')
const Hospital = require('../models/hospital.model')

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
const actualizarMedico = async (req = request, res = response) => {
    try {
        const medico = await Medico.findById(req.params.id)
        if (!medico) {
            return res
                .status(404)
                .json({ msg: 'no se ha encontrado ningún médico con ese Id' })
        }

        const nombre = req.body.nombre ?? medico.nombre
        medico.nombre = nombre

        medico.usuario = req.uid

        if (req.body.hospital) {
            const hospitalBBDD = await Hospital.findById(req.body.hospital)

            if (!hospitalBBDD) {
                return res.status(404).json({
                    msg: 'no se ha encontrado ningún hospital con ese Id',
                })
            }

            medico.hospital = hospitalBBDD._id
        }

        await medico.save()
        return res.status(200).json({ msg: 'actualizar ok', medico })
    } catch (error) {
        console.log('algo salió mal :(')
    }
}
const borrarMedico = async (req = request, res = response) => {
    try {
        const medico = await Medico.findByIdAndDelete(req.params.id)
        if (!medico) {
            return res
                .status(404)
                .json({ msg: 'no se ha encontrado ningún médico con ese Id' })
        } else {
            return res.status(200).json({ msg: 'Borrado!!!' })
        }
    } catch (error) {
        console.log('algo salió mal :(')
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}
