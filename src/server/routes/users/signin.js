import User from '../../../db/users.schema.js'
import encryptPassword from '../../../lib/encryptPassword.js'

export const signinRoute = {
    path: '/signin',
    method: 'post',
    handler: async (req, res) => {
        const { id, password } = req.body
        
        async function findUserByIdAndPassword () {
            return await User.findOne({
                id,
                password: encryptPassword(password)
            })
        }
    
        const user = await findUserByIdAndPassword()
    
        if (user === null) {
            throw new Error('401:아이디와 비밀번호가 일치하지 않습니다.')
        }

        req.session._id = user._id
        
        return res.json({ success: true })
        // return res.redirect('/')
    }
}