const User = require('../models/UserModel')
require('dotenv').config();
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');


const loginUser = (loginUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = loginUser
    try {
      const checkUser = await User.findOne({
        email: email
      })
      console.log(checkUser);

      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'this user is not defind'
        })

      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password)
      if (!comparePassword) {
        resolve({
          status: 'OK',
          message: 'the password is incorrect',
        })
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })
      console.log('accessToken:', access_token);

      resolve({
        status: 'OK',
        message: 'LOGIN SUCCESS',
        access_token: access_token,
        refresh_token: refresh_token
      })

    } catch (error) {
      reject(error)
    }
  })
}


module.exports = {

  loginUser,

}