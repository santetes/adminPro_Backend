const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    reject('ocurrió algún error en la generación del jwt')
                } else {
                    resolve(token)
                }
            }
        )
    })
}

module.exports = { generarJWT }
