import { Router } from 'express'
import { getPosts, createPost, updatePost, deletePost } from '../controllers/postController.js'
import { protectorMiddleware } from '../../middlewares/middleware.js'

const postRouter = Router()

postRouter.use('/posts', protectorMiddleware)

postRouter.get('/posts', getPosts)
postRouter.post('/posts', createPost)
postRouter.patch('/posts/:postId', updatePost)
postRouter.delete('/posts/:postId', deletePost)

// postRouter.route('/posts').all(protectorMiddleware).get(getPosts)
// postRouter.route('/posts').all(protectorMiddleware).post(createPost)
// postRouter.route('/posts/:postId').all(protectorMiddleware).patch(updatePost)
// postRouter.route('/posts/:postId').all(protectorMiddleware).delete(deletePost)

export default postRouter