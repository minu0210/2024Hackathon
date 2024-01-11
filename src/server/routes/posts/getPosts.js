import { Types } from 'mongoose'
const { ObjectId } = Types
import {Post } from '../../../db/posts.schema.js'
import User from '../../../db/users.schema.js'

export const getPostsRoute = {
    path: '/posts',
    method: 'get',
    handler: async (req, res) => {
        const { _id, isTeacher } = req.session

        if (_id === undefined) {
            throw new Error('401:로그인을 해주세요.')
        }

        if (isTeacher === false) {
            throw new Error('401:교사 계정만 조회가 가능합니다.')
        }

        let posts = await Post.find()

        posts = await Promise.all(
            posts.map(async post => {
                const user = await User.findOne({ _id: new ObjectId(post.author) })

                let authorName = '삭제된 유저'
                if (user !== null) {
                    authorName = user.name
                }

                return { ...post.toJSON(), authorName }
            })
        )
        
        return res.json(posts)
    }
}