const checkEmpty = (fn, val) => val === 0 || val ? fn(val) : val

export const formatPrice = (val) =>
  checkEmpty(val => `$ ${Number(val).toFixed(2)}`, val)

export const formatDate = (val) => checkEmpty(val => val.substr(0, 10), val)
