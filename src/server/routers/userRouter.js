import { Router } from 'express'
import { getUsers, signin, signout, signup } from '../controllers/userController.js'
import { protectorMiddleware } from '../../middlewares/middleware.js'

const userRouter = Router()

// userRouter.use('/users', protectorMiddleware)
// userRouter.use('/signup', protectorMiddleware)
// userRouter.use('/signin', protectorMiddleware)
// userRouter.use('/signout', protectorMiddleware)

// userRouter.get('/users', getUsers)
// userRouter.post('/signup', signup)
// userRouter.post('/signin', signin)
// userRouter.get('/signout', signout)

userRouter.route('/users').post(getUsers)
userRouter.route('/signup').post(signup)
userRouter.route('/signin').post(signin)
userRouter.route('/signout').post(signout)

export default userRouter