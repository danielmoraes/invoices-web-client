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
        role: 'ADMIN',
        activated: true
      },
      {
        id: 1,
        email: 'user@user.com',
        password: 'user',
        name: 'User',
        role: 'NORMAL',
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
      role: 'NORMAL',
      activated: true
    })
  }

  // create 5 simple invoices for each default user
  for (let userId = 0; userId < 2; userId++) {
    for (let i = 0; i < 5; i++) {
      data.invoices.push({
        id: data.invoices.length,
        userId: userId,
        type: 'SIMPLE',
        description: faker.lorem.words(),
        invoiceDate: faker.date.recent(),
        invoiceNumber: faker.random.number(),
        beneficiaryName: faker.company.companyName(),
        beneficiaryRegistrationNumber: faker.random.number(),
        amount: Number(faker.finance.amount())
      })
    }
  }

  // create 5 detailed invoices for each default user
  for (let userId = 0; userId < 2; userId++) {
    for (let i = 0; i < 5; i++) {
      const invoiceId = data.invoices.length
      const invoice = {
        id: invoiceId,
        userId: userId,
        type: 'DETAILED',
        description: faker.lorem.words(),
        invoiceDate: faker.date.recent(),
        invoiceNumber: faker.random.number({min: 100000, max: 999999}),
        beneficiaryName: faker.company.companyName(),
        beneficiaryRegistrationNumber:
          faker.random.number({min: 100000, max: 999999})
      }
      let invoiceAmount = 0
      // create 5 invoice items for each detailed invoice
      for (let j = 0; j < 5; j++) {
        const quantity = faker.random.number({ min: 1, max: 10 })
        const unitPrice = Number(faker.finance.amount(1, 100))
        const amount = quantity * unitPrice
        data.items.push({
          id: data.items.length,
          invoiceId: invoiceId,
          description: faker.lorem.words(),
          quantity,
          unitPrice,
          amount
        })
        invoiceAmount += amount
      }
      invoice.amount = invoiceAmount
      data.invoices.push(invoice)
    }
  }

  return data
})()
