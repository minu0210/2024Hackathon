import _ from 'lodash';
import User from '../../../db/users.schema.js'
import checkDuplicatedId from '../../../lib/checkDuplicatedId.js';
import encryptPassword from '../../../lib/encryptPassword.js'
import * as validate from '../../../validate/index.js'

export const signupRoute = {
    path: '/signup',
    method: 'post',
    handler: async (req, res) => {
        const user = _.pick(
            req.body,
            [
                'id',
                'password',
                'name',
                'email',
                'isTeacher'
            ]
        )

        let isTeacher = false

        if (await checkDuplicatedId(req.body.id)) {
            throw new Error('400:아이디가 중복됩니다.')
        }

        if (!validate.checkId(user.id)) {
            return res.status(400).json({
                errorCode: 'ValidationError',
                errorMessage: '"id" 문제가 있습니다.'
            })
        }

        if (!validate.checkPassword(user.password)) {
            return res.status(400).json({
                errorCode: 'ValidationError',
                errorMessage: '"password" 문제가 있습니다.'
            })
        }

        if (!validate.checkString(user.name, [2, 20])) {
            return res.status(400).json({
                errorCode: 'ValidationError',
                errorMessage: '"name" 문제가 있습니다.'
            })
        }

        if (validate.checkEmail(user.email) === 0) {
            return res.status(400).json({
                errorCode: 'ValidationError',
                errorMessage: '"email" 문제가 있습니다.'
            })
        }

        if (validate.checkEmail(user.email) === 2) {
            isTeacher = true
        }
        
        await User.create(
            Object.assign(
                user,
                {
                    password: encryptPassword(user.password),
                    isTeacher: isTeacher
                }
            )
        )

        // return res.redirect('/')
        return res.json({ success: true, userType: validate.checkEmail(user.email) })
    }
}