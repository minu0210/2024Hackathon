import { checkString } from './string.js'

const nameRegex = /^[가-힣]{2,5}$/

export function checkName (input) {
  if (!checkString(input)) return false

  const name = input
  if (!nameRegex.test(name)) return false

  return true
}
