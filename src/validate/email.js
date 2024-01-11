// sdh220416@sdh.hs.kr

// return 0 => 로그인 실패 / 1 => 학생 로그인 / 2 => 교사 로그인
import { checkString } from './string.js'

const emailPartRegex = /^[0-9]{6}$/

export function checkEmail (input) {
  if (!checkString(input)) {
    return 0
  } else {

    const [frontEmail, backEmail] = input.split('@')
    if (backEmail !== 'sdh.hs.kr') {
      return 0
  
    } else if (frontEmail.substr(0, 3) === 'sdh' && 
      emailPartRegex.test(frontEmail.substr(3)) && 
      backEmail === 'sdh.hs.kr') {
        return 1
  
    } else if (backEmail === 'sdh.hs.kr') {
      return 2
    }
  }

  return 0
}
