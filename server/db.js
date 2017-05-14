const faker = require('faker')

faker.seed(123)

module.exports = (() => {
  const data = {
    users: [
      {
        id: 0,
        email: 'admin@admin.com',
        password: 'admin',
        name: 'Admin',
        role: 2,
        activated: true
      },
      {
        id: 1,
        email: 'user@user.com',
        password: 'user',
        name: 'User',
        role: 1,
        activated: true
      }
    ],

    invoices: [],
    items: []
  }

  // create 5 random users
  for (let i = 0; i < 5; i++) {
    data.users.push({
      id: data.users.length,
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      role: 1,
      activated: true
    })
  }

  // create 5 simple invoices for each default user
  for (let userId = 0; userId < 2; userId++) {
    for (let i = 0; i < 5; i++) {
      data.invoices.push({
        id: data.invoices.length,
        userId: userId,
        type: 1,
        description: faker.lorem.words(),
        invoiceDate: faker.date.recent(),
        invoiceNumber: faker.random.number(),
        beneficiaryName: faker.company.companyName(),
        beneficiaryRegistrationNumber: faker.random.number(),
        amount: faker.finance.amount()
      })
    }
  }

  // create 5 detailed invoices for each default user
  for (let userId = 0; userId < 2; userId++) {
    for (let i = 0; i < 5; i++) {
      const invoiceId = data.invoices.length
      data.invoices.push({
        id: invoiceId,
        userId: userId,
        type: 2,
        description: faker.lorem.words(),
        invoiceDate: faker.date.recent(),
        invoiceNumber: faker.random.number(),
        beneficiaryName: faker.company.companyName(),
        beneficiaryRegistrationNumber: faker.random.number(),
        amount: faker.finance.amount()
      })
      // create 5 invoice items for each detailed invoice
      for (let j = 0; j < 5; j++) {
        data.items.push({
          id: data.items.length,
          invoiceId: invoiceId,
          description: faker.lorem.words(),
          quantity: faker.random.number(),
          unitPrice: faker.finance.amount(),
          amount: faker.finance.amount()
        })
      }
    }
  }

  return data
})()
