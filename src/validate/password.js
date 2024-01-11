import { checkString } from './string.js'

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-+=_:?><]).{6,20}$/

// password.ts
// 영어 대문자 하나 이상
// 영어 소문자 하나 이상
// 숫자 하나 이상
// 특수문자 하나 이상
// !@#$%^&*()-+=_~:?><
// 6 ~ 20

export function checkPassword (input) {
  if (!checkString(input)) return false

  const password = input
  if (!passwordRegex.test(password)) return false

  return true
}
