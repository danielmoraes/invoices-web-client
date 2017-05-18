const checkEmpty = (fn, val) => val ? fn(val) : val

export const formatPrice = (val) => checkEmpty(val => `$ ${val}`, val)
export const formatDate = (val) => checkEmpty(val => val.substr(0, 10), val)
