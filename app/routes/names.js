export default [
  { path: /^\/app\/invoices$/, name: 'Invoices' },
  { path: /^\/app\/invoices\/new$/, name: 'New Invoice' },
  { path: /^\/app\/invoices\/[\d]+$/, name: 'Invoice' },
  { path: /^\/app\/invoices\/[\d]+\/edit$/, name: 'Edit Invoice' },
  { path: /^\/app\/invoices\/[\d]+\/items\/new$/, name: 'New Invoice Item' },
  { path: /^\/app\/invoices\/[\d]+\/items\/[\d]+\/edit$/,
    name: 'Edit Invoice Item' },
  { path: /^\/app\/users$/, name: 'Users' },
  { path: /^\/app\/users\/new$/, name: 'New User' },
  { path: /^\/app\/users\/[\d]+$/, name: 'User' },
  { path: /^\/app\/users\/[\d]+\/edit$/, name: 'Edit User' },
  { path: /^\/app\/users\/[\d]+\/edit-password$/, name: 'Edit User Password' },
  { path: /^\/app\/account$/, name: 'Account' },
  { path: /^\/app\/account\/edit$/, name: 'Edit Account' },
  { path: /^\/app\/account\/edit-password$/, name: 'Edit Password' }
]
