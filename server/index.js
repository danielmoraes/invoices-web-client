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

// set req.user
server.use(cookieParser(), expressJwt({
  secret: JWT_SECRET,
  credentialsRequired: false,
  getToken: (req) => {
    let token = req.get('Authorization')
    if (token && token.split(' ')[0] === 'Bearer') token = token.split(' ')[1]
    return token || req.cookies.token || null
  }
}))

// sign in or load auth user
server.get('/auth', (req, res) => {
  const email = req.get('email')
  const encp = req.get('encp')

  if (!email || !encp) {
    if (req.user) {
      const user = db.users.filter(u => u.id === req.user.id)[0]
      return res.status(200).jsonp(user)
    } else {
      return res.sendStatus(401)
    }
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

// sign out
server.delete('/auth', (req, res) => {
  res.cookie('token', 'invalidated', { httpOnly: true, maxAge: 0 })
  res.sendStatus(200)
})

// require auth
server.use((req, res, next) => {
  if (req.path === '/users' && req.method === 'POST') {
    return next()
  }
  return req.user ? next() : res.sendStatus(401)
})

server.use(jsonServer.bodyParser)

// ensure that the invoice amount is set to 0 on invoice create
server.post('/invoices', (req, res, next) => {
  req.body.amount = req.body.amount || 0
  next()
})

// set invoice amount on the request body on invoice update
server.put('/invoices/:id', (req, res, next) => {
  const invoiceId = Number(req.params.id)
  if (req.body.type === 'DETAILED') {
    const invoice = db.invoices.filter(iv => iv.id === invoiceId)[0]
    if (invoice) {
      req.body.amount = invoice.amount
    }
  }
  next()
})

// update invoice amount and invoice item amount on invoice item create
server.post('/items', (req, res, next) => {
  req.body.amount = Number(req.body.quantity) * Number(req.body.unitPrice)
  const invoice = db.invoices.filter(iv => iv.id === req.body.invoiceId)[0]
  if (invoice) {
    const amount = Math.max(invoice.amount + req.body.amount, 0)
    invoice.amount = amount
    res.set('invoice-amount', amount)
  }
  next()
})

// update invoice amount and invoice item mount on invoice item update
server.put('/items/:id', (req, res, next) => {
  const itemId = Number(req.params.id)
  const item = db.items.filter(it => it.id === itemId)[0]
  if (item) {
    const old = item.amount
    req.body.amount = Number(req.body.quantity) * Number(req.body.unitPrice)
    const invoice = db.invoices.filter(iv => iv.id === req.body.invoiceId)[0]
    if (invoice) {
      const amount = Math.max(invoice.amount + Number(req.body.amount) - old, 0)
      invoice.amount = amount
      res.set('invoice-amount', amount)
    }
  }
  next()
})

// update invoice amount on invoice item delete
server.delete('/items/:id', (req, res, next) => {
  const itemId = Number(req.params.id)
  const item = db.items.filter(it => it.id === itemId)[0]
  if (item) {
    const invoice = db.invoices.filter(iv => iv.id === item.invoiceId)[0]
    if (invoice) {
      const amount = Math.max(invoice.amount - item.amount, 0)
      invoice.amount = amount
      res.set('invoice-amount', amount)
    }
  }
  next()
})

// update user password
server.patch('/users/:id', (req, res, next) => {
  const authUserId = Number(req.user.id)
  const authUser = db.users.filter(u => u.id === authUserId)[0]

  const userId = Number(req.params.id)
  const user = db.users.filter(u => u.id === userId)[0]

  if (!user || !authUser) {
    return res.sendStatus(401)
  }

  if (authUser.role !== 'ADMIN' || authUser.id === user.id) {
    const oldPassword = req.get('encp-old')

    if (!oldPassword) {
      return res.sendStatus(401)
    }

    if (user.password !== Buffer.from(oldPassword, 'base64').toString()) {
      return res.sendStatus(401)
    }
  }

  const newPassword = req.get('encp')
  if (newPassword) {
    user.password = Buffer.from(newPassword, 'base64').toString()
  }

  next()
})

// exposed response headers
router.render = (req, res) => {
  res.set('Access-Control-Expose-Headers', 'Location, invoice-amount')
  res.jsonp(res.locals.data)
}

server.use(router)

server.listen(12336, () => { console.log('JSON Server is running') })
