// @ts-ignore
let _auth = axios.create({
  baseURL: '/account',
  withCredentials: true,
  timeout: 5000
})

let _user = {}

export default class AuthService {
  constructor() { }

  get user() {
    return _user
  }

  login(creds, draw) {
    _auth.post('login', creds)
      .then(res => {
        _user = res.data
        draw()
      })
      .catch(err => {
        console.error(err)
      })
  }

  register(creds, draw) {
    _auth.post('register', creds)
      .then(res => {
        _user = res.data
        console.log('registered')
        draw()
      })
      .catch(err => {
        console.error(err)
      })
  }

  authenticate(drawOnSuccess, drawOnFail) {
    _auth.get('authenticate')
      .then(res => {
        console.log(res.data)
        _user = res.data
        drawOnSuccess()
      })
      .catch(err => {
        console.error(err)
        drawOnFail()
      })
  }

  logout(draw) {
    _auth.delete('logout')
      .then(res => {
        _user = {}
        draw()
      })
      .catch(err => {
        console.error(err)
      })
  }

}