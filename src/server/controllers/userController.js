import _ from 'lodash'
import User from '../models/users.schema.js'
import * as validate from '../../validate/index.js'
import encryptPassword from '../../lib/encryptPassword.js'
import checkDuplicatedId from '../../lib/checkDuplicatedId.js'

// method: get
// path: /getUsers
const getUsers = async (req, res) => {
  if (!req.session.isTeacher) return res.send('<script>alert("교사 계정만 확인할 수 있습니다."); location.href = "/"</script>') 
  const users = await User.find()    
  return res.status(200).json(users)
}

// method: post
// path: /signup
const signup = async (req, res) => {
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
    // throw new Error('400:아이디가 중복됩니다.')
    return res.send('<script>중복된 아이디입니다.</script>')
  }

  if (!validate.checkId(user.id)) {
    // return res.status(400).json({
      //     errorCode: 'ValidationError',
      //     errorMessage: '"id" 문제가 있습니다.'
      // })
      return res.send('<script>alert("아이디는 영문 및 숫자가 포함된 4~20자로 입력 가능합니다."); location.href = "/signup.html"</script>')
  }

  if (!validate.checkPassword(user.password)) {
      // return res.status(400).json({
      //     errorCode: 'ValidationError',
      //     errorMessage: '"password" 문제가 있습니다.'
      // })
      return res.send('<script>alert("비밀번호는 영문 및 숫자가 포함된 6~20자로 입력 가능합니다."); location.href = "/signup.html" </script>')
  }

  if (!validate.checkName(user.name, [2, 20])) {
      // return res.status(400).json({
      //     errorCode: 'ValidationError',
      //     errorMessage: '"name" 문제가 있습니다.'
      // })
      return res.send('<script>alert("이름은 한글 2~5자로 입력 가능합니다."); location.href = "/signup.html" </script>')
  }

  if (validate.checkEmail(user.email) === 0) {
      // return res.status(400).json({
      //     errorCode: 'ValidationError',
      //     errorMessage: '"email" 문제가 있습니다.'
      // })
      return res.send('<script>alert("이메일은 학교 계정만 입력 가능합니다."); location.href = "/signup.html" </script>')
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

  return res.redirect('/getPosts.html')
  //return res.json({ success: true, userType: validate.checkEmail(user.email) })
}

// method: post
// path: /signin
const signin = async (req, res) => {
  const { id, password } = req.body
  
  async function findUserByIdAndPassword () {
      return await User.findOne({
          id,
          password: encryptPassword(password)
      })
  }

  const user = await findUserByIdAndPassword()

  if (user === null) {
    // throw new Error('401:아이디와 비밀번호가 일치하지 않습니다.')
    return res.send('<script>alert("아이디와 비밀번호가 일치하지 않습니다."); location.href = "/signin.html" </script>')
  }

  req.session._id = user._id
  
  // return res.json({ success: true })
  return res.redirect('/getPosts.html')
}

// method: get
// path: /signout
const signout = async (req, res) => {
  if (req.session) {
      req.session.destroy()
      } else {
        return res.send('<script>alert("로그인 상태가 아닙니다."); location.href = "/" </script>')
  }
  
  return res.redirect('/')
}

export { getUsers, signup, signin, signout }