import { checkString } from './string.js'

const passwordRegex = /^(?=.*[A-z])(?=.*\d).{6,20}$/

// password.ts
// 영어 하나 이상
// 숫자 하나 이상
// 6 ~ 20

export function checkPassword (input) {
  if (!checkString(input)) return false

  const password = input
  if (!passwordRegex.test(password)) return false

  return true
}
