import * as crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

export default function encryptPassword(password) {
    return crypto
        .createHash('sha256')
        .update(password + process.env.PASSWORD_SALT)
        .digest('base64')
}