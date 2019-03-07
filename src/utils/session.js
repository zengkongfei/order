
export function getuserInfo(a) {
    return sessionStorage.getItem(a)
  }

  export function setuserInfo(a,b) {
    return sessionStorage.setItem(a,b)
  } 

  export function removeuserInfo(a) {
    return sessionStorage.removeItem(a)
  }