import { Types } from 'mongoose'
const { ObjectId } = Types
import _ from 'lodash'
import Post from '../../../db/posts.schema'

export const updatePostRoute = {
    path: '/posts/:postId',
    method: 'patch',
    handler: async (req, res) => {
        const { postId: _id } = req.params

        await Post.updateOne(
            { _id: new ObjectId(_id) }, 
            { $set: _.pick(req.body, ['category', 'title', 'content']) }
        )

        return res.json({ success: true })
        return res.redirect('/')
    }
}