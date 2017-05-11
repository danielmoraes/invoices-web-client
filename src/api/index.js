const fakeDatabase = {
  users: {
    'admin@admin.com': { 'name': 'Admin', 'password': 'admin' }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const response = (status, body = {}) => ({ status, json: () => body })

export const Auth = {
  current: () =>
    delay(500).then(() => {
      const userLocalStorage = window.localStorage.getItem('user')
      if (userLocalStorage) {
        return response(200, JSON.parse(userLocalStorage))
      }
      return response(401)
    }),

  signIn: (email, password) =>
    delay(500).then(() => {
      const record = fakeDatabase.users[email]
      if (record && record.password === password) {
        const user = { name: record.name }
        window.localStorage.setItem('user', JSON.stringify(user))
        return response(200, user)
      }
      return response(401)
    }),

  signOut: () =>
    delay(500).then(() => {
      window.localStorage.setItem('user', '')
      return response(200)
    })
}
