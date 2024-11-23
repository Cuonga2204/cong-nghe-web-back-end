const User = require('../models/UserModel')
require('dotenv').config();
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser
    try {
      const checkUser = await User.findOne({
        email: email
      })
      if (checkUser !== null) {
        return resolve({
          status: 'OK',
          message: 'this email is already'
        })
      }
      const hash = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone
      })
      if (createUser) {
        resolve({
          status: 'OK',
          message: 'CREATE SUCCESS',
          data: createdUser
        })
      }

    } catch (error) {
      reject(error)
    }
  })
}

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

const updateUser = (userId, data) => {
  return new Promise(async (resolve, reject) => {

    try {
      const checkUser = await User.findOne({
        _id: userId
      })
      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'userId is required',
        })
      }
      const updatedUser = await User.findByIdAndUpdate(userId, data);
      console.log(updatedUser);
      resolve({
        status: 'OK',
        message: 'UPDATE SUCCESS',
      })
    } catch (error) {
      reject(error)
    }
  })
}
const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId
      })
      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'userId is required',
        })
      }
      const deletedUser = await User.findByIdAndDelete(userId);
      console.log("user đã xoá", deletedUser);
      resolve({
        status: 'OK',
        message: 'DELETE SUCCESS',
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
}