const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    const user = await User.create({ ...req.body})
    const token = user.genToken()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password ) {
        throw new BadRequestError('Invalid email or password')
    }

    // find user by email
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    // compare passwords
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    // user exists and now create token
    const token = user.genToken()
    
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
    login
}