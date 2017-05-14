const cookieParser = require('cookie-parser')
const db = require('./db')
const expressJwt = require('express-jwt')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret'

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(cookieParser(), expressJwt({
  secret: JWT_SECRET,
  credentialsRequired: false,
  getToken: (req) => {
    let token = req.get('Authorization')
    if (token && token.split(' ')[0] === 'Bearer') token = token.split(' ')[1]
    return token || req.cookies.token || null
  }
}))

server.get('/auth', (req, res) => {
  const email = req.get('email')
  const encp = req.get('encp')
  if (!email || !encp) {
    return req.user ? res.status(200).jsonp(req.user) : res.sendStatus(401)
  }

  // check credentials
  let user = db.users.filter(u => u.email === email)[0]
  if (!user || !user.activated) return res.sendStatus(401)
  const password = Buffer.from(encp, 'base64').toString()
  if (password !== user.password) return res.sendStatus(401)

  // build response
  user = (({ id, name, email, role }) => ({ id, name, email, role }))(user)
  const newToken = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' })
  res.set({ 'x-access-token': newToken })
  res.cookie('token', newToken, { httpOnly: true, maxAge: 60000 * 60 * 24 })
  return res.status(200).jsonp(user)
})

server.delete('/auth', (req, res) => {
  res.cookie('token', 'invalidated', { httpOnly: true, maxAge: 0 })
  res.sendStatus(200)
})

// require auth
server.use((req, res, next) => req.user ? next() : res.sendStatus(401))

server.use(router)

server.listen(3000, () => { console.log('JSON Server is running') })
