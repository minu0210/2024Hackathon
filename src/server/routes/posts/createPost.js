import _ from 'lodash'
import { Post } from '../../../db/posts.schema.js'

export const createPostRoute = {
    path: '/posts',
    method: 'post',
    handler: async (req, res) => {
        const { _id } = req.session

        if (_id === undefined) {
            throw new Error('401:로그인을 해주세요.')
        }
        
        const post = _.pick(req.body, ['category', 'title', 'content'])
        await Post.create({ ...post, author: _id })

        return res.json({ success: true })
        return res.redirect('/')
    }
}