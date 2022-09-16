const { Schema, model } = require('mongoose')

const HospitalSchema = Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
    },
    { collection: 'hospitales' } // Modificación para que muestre el nombre plural de la colección correctamente
)

HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject()

    return object
})

module.exports = model('Hospital', HospitalSchema)
