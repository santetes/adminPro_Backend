const { request, response } = require('express')
const Usuario = require('../models/usuario.model')
const Medico = require('../models/medico.model')
const Hospital = require('../models/hospital.model')

const busquedaTodo = async (req = request, res = response) => {
    const { termino } = req.params
    const regex = new RegExp(termino, 'i')

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ])

    res.status(200).json({ msg: 'busqueda Ok ', usuarios, medicos, hospitales })
}

const busquedaPorColeccion = async (req = request, res = response) => {
    const { tabla, termino } = req.params
    const regex = new RegExp(termino, 'i')

    switch (tabla) {
        case 'usuarios':
            const usuarios = await Usuario.find({ nombre: regex })
            res.status(200).json({ msg: 'ok', usuarios })
            break
        case 'medicos':
            const medicos = await Medico.find({ nombre: regex })
                .populate('usuario', ['nombre', 'img'])
                .populate('hospital', ['nombre', 'img'])
            res.status(200).json({ msg: 'ok', medicos })
            break
        case 'hospitales':
            const hospitales = await Hospital.find({ nombre: regex }).populate(
                'usuario',
                ['nombre', 'img']
            )
            res.status(200).json({ msg: 'ok', hospitales })
            break

        default:
            res.status(400).json({
                msg: 'no ha indicado una colección existente',
            })
            break
    }
}

module.exports = {
    busquedaTodo,
    busquedaPorColeccion,
}
