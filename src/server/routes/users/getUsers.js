import User from '../../../db/users.schema.js'

export const getUsersRoute = {
    path: '/users',
    method: 'get',
    handler: async (req, res) => {
        const users = await User.find()    
        return res.json(users)
    }
}