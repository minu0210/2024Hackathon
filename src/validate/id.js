import { checkString } from './string.js'

const idRegex = /^[0-9a-zA-Z]{4,20}$/

// [0-9a-zA-Z]{4,20}
export function checkId (input) {
  if (!checkString(input)) return false

  const id = input
  if (!idRegex.test(id)) return false

  return true
}
