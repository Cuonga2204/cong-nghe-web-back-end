
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '365d' })
    return access_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, 'refresh_token', { expiresIn: '365d' })
    return refresh_token
}
const refreshTokenService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log('err', err);
                    resolve({
                        status: 'ERR',
                        message: 'The authemtication refreshTokenService'
                    })
                }
                const { payload } = user;
                const access_token = await genneralAccessToken({
                    id: payload.id,
                    isAdmin: payload.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS REFRESH_TOKEN',
                    access_token
                })
            });
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenService
}