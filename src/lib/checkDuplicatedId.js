import User from '../db/users.schema.js'

export default async function (id) {
    const user = await User.findOne({ id })
    return user !== null
}