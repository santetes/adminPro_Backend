const fs = require('fs')

const Usuario = require('../models/usuario.model')
const Medico = require('../models/medico.model')
const Hospital = require('../models/hospital.model')

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async (coleccion, id, nombreArchivo) => {
    let pathViejo
    switch (coleccion) {
        case 'medicos':
            let medico
            try {
                medico = await Medico.findById(id)
                if (!medico) {
                    console.log('el id indicado no es un médico')
                    return false
                }
            } catch (error) {
                console.log('no es un id válido mongo')
                return false
            }

            pathViejo = `./uploads/medicos/${medico.img}`
            borrarImagen(pathViejo)

            medico.img = nombreArchivo
            await medico.save()
            return true

            break
        case 'hospitales':
            let hospital
            try {
                hospital = await Hospital.findById(id)
                if (!hospital) {
                    console.log('el id indicado no es un hospital')
                    return false
                }
            } catch (error) {
                console.log('no es un id válido mongo')
                return false
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`
            borrarImagen(pathViejo)

            hospital.img = nombreArchivo
            await hospital.save()
            return true
            break
        case 'usuarios':
            let usuario
            try {
                usuario = await Usuario.findById(id)
                if (!usuario) {
                    console.log('el id indicado no es un usuario')
                    return false
                }
            } catch (error) {
                console.log('no es un id válido mongo')
                return false
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`
            borrarImagen(pathViejo)

            usuario.img = nombreArchivo
            await usuario.save()
            return true
            break

        default:
            break
    }
}

module.exports = { actualizarImagen }
