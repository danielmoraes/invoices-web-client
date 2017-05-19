export const stringToBase64 = (s) => Buffer.from(s).toString('base64')
export const base64ToString = (e) => Buffer.from(e, 'base64').toString()
