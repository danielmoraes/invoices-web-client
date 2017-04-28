const fakeDatabase = {
  users: {
    'admin@admin': { 'name': 'Admin', 'password': 'admin' }
  }
}

const fakeRequest = () => new Promise(resolve => setTimeout(resolve, 500))

export const authenticate = (email = '', password = '', keepAlive = false) =>
  fakeRequest().then(() => {
    let user
    if (email && password) {
      const record = fakeDatabase.users[email]
      if (record && record.password === password) {
        user = { name: record.name }
        window.localStorage.setItem('user', JSON.stringify(user))
      }
    } else {
      const userLocalStorage = window.localStorage.getItem('user')
      if (userLocalStorage) {
        user = JSON.parse(userLocalStorage)
      }
    }

    return (user) ? { status: 200, user } : { status: 401 }
  })

export const invalidateToken = (token) =>
  fakeRequest().then(() => {
    window.localStorage.setItem('user', '')
    return { status: 200 }
  })
