import User from '../server/models/users.schema.js'

export default async function (id) {
    const user = await User.findOne({ id })
    return user !== null
}