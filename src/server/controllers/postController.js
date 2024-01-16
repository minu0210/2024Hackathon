import _ from 'lodash'
import { Types } from 'mongoose'
const { ObjectId } = Types
import User from '../models/users.schema.js'
import Post from '../models/posts.schema.js'

// method: get
// path: /posts
const getPosts = async (req, res) => {
  const { _id, isTeacher } = req.session

  if (_id === undefined) {
      // throw new Error('401:로그인을 해주세요.')
      return res.send('<script>alert("로그인 상태가 아닙니다."); location.href = "/" </script>')

  }

  // 교사 글 조회
  // if (isTeacher === false) {
  //     // throw new Error('401:교사 계정만 조회가 가능합니다.')
  //     return res.send('<script>alert("교사 계정만 조회가 가능합니다."); location.href = "/" </script>')
  // }

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

// path: /posts
// method: post
const createPost = async (req, res) => {
  const { _id } = req.session

  if (_id === undefined) {
      throw new Error('401:로그인을 해주세요.')
  }
  
  const post = _.pick(req.body, ['category', 'title', 'content'])
  await Post.create({ ...post, author: _id })

  //return res.json({ success: true })
  return res.redirect('/getPosts.html')
}

// path: /posts/:postId
// method: patch
const updatePost = async (req, res) => {
  const { postId: _id } = req.params

  await Post.updateOne(
      { _id: new ObjectId(_id) }, 
      { $set: _.pick(req.body, ['category', 'title', 'content']) }
  )

  //return res.json({ success: true })
  return res.redirect('/getPosts.html')
}

// path: /posts/:postId
// method: delete
const deletePost = async (req, res) => {
  const { postId: _id } = req.params

  await Post.deleteOne({ _id: new ObjectId(_id) })

  return res.redirect('/getPosts.html')
}

export { getPosts, createPost, updatePost, deletePost } 