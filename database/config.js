const mongoose = require('mongoose')

const dbConexion = async () => {
    try {
        await mongoose.connect(process.env.DB_CONEXION)
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos')
    }

    console.log('DB Online')
}

module.exports = dbConexion
