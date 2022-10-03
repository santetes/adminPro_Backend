const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const { request, response } = require('express')
const { actualizarImagen } = require('../helpers/actualizar-imagen.helpers')

const fileUpload = async (req = request, res = response) => {
    const { coleccion, id } = req.params

    // Validar colección
    const coleccionesPermitidas = ['usuarios', 'medicos', 'hospitales']
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res
            .status(400)
            .json({ msg: 'no ha indicado una colección válida' })
    }

    // Importante, para poder subir archivos es necesario utilizar el middleware
    // app.use(fileUploader()) en el archivo index.js

    //Comprobamos si viene algún archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' })
    }

    // Procesar la imagen
    const file = req.files.imagen
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]

    // Validamos la extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            msg: 'no ha adjuntado un archivo válido',
        })
    }

    // Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    // Path para guardar la imagen
    const path = `./uploads/${coleccion}/${nombreArchivo}` //Ruta absoluta

    // Actualizar imagen en bbdd y borrar antigua si existiera
    const isValidActualization = await actualizarImagen(
        coleccion,
        id,
        nombreArchivo
    )

    // Si la actualización es correcta, se mueve el archivo a la carpeta en la bbdd
    if (isValidActualization) {
        file.mv(path).then((err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ msg: 'error al mover la imagen' })
            }

            res.json({ ok: true, nombreArchivo })
        })
    } else {
        return res.status(400).json({
            msg: 'ocurrión algun error en la acturalización de la imagen',
        })
    }
}

const retornaImagen = (req = request, res = response) => {
    const { coleccion, imagen } = req.params
    const pathImg = path.join(
        __dirname,
        '../uploads',
        `/${coleccion}`,
        `/${imagen}`
    )
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
    } else {
        const pathImg = path.join(__dirname, '../assets/img/no-img.jpg')
        return res.sendFile(pathImg)
    }
}

module.exports = { fileUpload, retornaImagen }
