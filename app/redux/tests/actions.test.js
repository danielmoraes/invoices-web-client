import configureMockStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import { normalize } from 'normalizr'
import thunk from 'redux-thunk'

import { stringToBase64 } from '../../lib/converter'
import * as actions from '../actions'
import * as schema from '../actions/schema'
import * as types from '../actionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const BASE_URL = 'http://localhost'

describe('redux actions for authentication', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const user = { id: 0, name: 'user', email: 'user@user.com' }

  it('creates SIGNING_IN_SUCCEEDED when signing in is done', () => {
    const requestHeaders = {
      reqheaders: {
        email: user.email,
        encp: stringToBase64('valid-password')
      }
    }

    nock(BASE_URL, requestHeaders)
      .get('/auth')
      .reply(200, user)

    const expectedActions = [
      { type: types.SIGNING_IN },
      { type: types.SIGNING_IN_SUCCEEDED, payload: user }
    ]

    const store = mockStore({})

    return store.dispatch(actions.signIn(user.email, 'valid-password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates SIGNING_IN_FAILED when signing in ends 401', () => {
    const requestHeaders = {
      requestheaders: {
        email: user.email,
        encp: stringToBase64('invalid-password')
      }
    }

    nock(BASE_URL, requestHeaders)
      .get('/auth')
      .reply(401)

    const expectedActions = [
      { type: types.SIGNING_IN },
      { type: types.SIGNING_IN_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.signIn(user.email, 'invalid-password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates LOADING_AUTH_USER_SUCCEEDED when loading auth is done', () => {
    nock(BASE_URL)
      .get('/auth')
      .reply(200, user)

    const expectedActions = [
      { type: types.LOADING_AUTH_USER },
      { type: types.LOADING_AUTH_USER_SUCCEEDED, payload: user }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadAuthUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates LOADING_AUTH_USER_FAILED when loading auth ends 401', () => {
    nock(BASE_URL)
      .get('/auth')
      .reply(401)

    const expectedActions = [
      { type: types.LOADING_AUTH_USER },
      { type: types.LOADING_AUTH_USER_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadAuthUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates SIGNING_OUT_SUCCEEDED when signing out is done', () => {
    nock(BASE_URL)
      .delete('/auth')
      .reply(200)

    const expectedActions = [
      { type: types.SIGNING_OUT },
      { type: types.SIGNING_OUT_SUCCEEDED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.signOut())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates SIGNING_OUT_FAILED when signing out ends 401', () => {
    nock(BASE_URL)
      .delete('/auth')
      .reply(401)

    const expectedActions = [
      { type: types.SIGNING_OUT },
      { type: types.SIGNING_OUT_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.signOut())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

describe('redux actions for invoices', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const user = { id: 0, name: 'user', email: 'user@user.com' }

  const invoice = {
    id: 0,
    description: 'invoice'
  }

  it('creates LOADING_INVOICES_SUCCEEDED when loading invoices is done', () => {
    const invoiceWithItems = { ...invoice, items: [] }

    nock(BASE_URL)
      .get(/^\/invoices/)
      .reply(200, [invoiceWithItems])

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_INVOICES },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_INVOICES_SUCCEEDED,
        payload: normalize([invoiceWithItems], [schema.invoice]) }
    ]

    const store = mockStore({ auth: { user } })

    return store.dispatch(actions.loadInvoices())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidLoadInvoices = (errorCode) => {
    nock(BASE_URL)
      .get(/^\/invoices/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_INVOICES },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_INVOICES_FAILED }
    ]

    const store = mockStore({ auth: { user } })

    return store.dispatch(actions.loadInvoices())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates LOADING_INVOICES_FAILED when loading invoices ends 401', () => {
    return testInvalidLoadInvoices(401)
  })

  it('creates LOADING_INVOICES_SUCCEEDED when loading invoice is done', () => {
    const invoiceWithItems = { ...invoice, items: [] }

    nock(BASE_URL)
      .get(/^\/invoices\/[\d]+/)
      .reply(200, invoiceWithItems)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_INVOICES },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_INVOICES_SUCCEEDED,
        payload: normalize(invoiceWithItems, schema.invoice) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadInvoice(invoice.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidLoadInvoice = (errorCode) => {
    nock(BASE_URL)
      .get(/^\/invoices\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_INVOICES },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_INVOICES_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadInvoice(invoice.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates LOADING_INVOICES_FAILED when loading invoice ends 401', () => {
    return testInvalidLoadInvoice(401)
  })

  it('creates LOADING_INVOICES_FAILED when loading invoice ends 404', () => {
    return testInvalidLoadInvoice(404)
  })

  it('creates CREATING_INVOICE_SUCCEEDED when creating invoice is done', () => {
    nock(BASE_URL)
      .post(/^\/invoices/)
      .reply(201, invoice)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.CREATING_INVOICE, payload: invoice },
      { type: types.FETCHING_ENDED },
      { type: types.CREATING_INVOICE_SUCCEEDED,
        payload: normalize(invoice, schema.invoice) }
    ]

    const store = mockStore({ auth: { user } })

    return store.dispatch(actions.createInvoice(invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidCreateInvoice = (errorCode) => {
    nock(BASE_URL)
      .post(/^\/invoices/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.CREATING_INVOICE, payload: invoice },
      { type: types.FETCHING_ENDED },
      { type: types.CREATING_INVOICE_FAILED }
    ]

    const store = mockStore({ auth: { user } })

    return store.dispatch(actions.createInvoice(invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates CREATING_INVOICES_FAILED when creating invoice ends 400', () => {
    return testInvalidCreateInvoice(400)
  })

  it('creates CREATING_INVOICES_FAILED when creating invoice ends 401', () => {
    return testInvalidCreateInvoice(401)
  })

  it('creates UPDATING_INVOICE_SUCCEEDED when updating invoice is done', () => {
    nock(BASE_URL)
      .put(/^\/invoices\/[\d]+/)
      .reply(200, invoice)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE, payload: invoice },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_SUCCEEDED,
        payload: normalize(invoice, schema.invoice) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateInvoice(invoice.id, invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidUpdateInvoice = (errorCode) => {
    nock(BASE_URL)
      .put(/^\/invoices\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE, payload: invoice },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateInvoice(invoice.id, invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_INVOICES_FAILED when updating invoice ends 400', () => {
    return testInvalidUpdateInvoice(400)
  })

  it('creates UPDATING_INVOICES_FAILED when updating invoice ends 401', () => {
    return testInvalidUpdateInvoice(401)
  })

  it('creates MERGING_INVOICE_SUCCEEDED when merging invoice is done', () => {
    nock(BASE_URL)
      .patch(/^\/invoices/)
      .reply(200, invoice)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE, payload: invoice },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_SUCCEEDED,
        payload: normalize(invoice, schema.invoice) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.mergeInvoice(invoice.id, invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidMergeInvoice = (errorCode) => {
    nock(BASE_URL)
      .patch(/^\/invoices\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE, payload: invoice },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.mergeInvoice(invoice.id, invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_INVOICES_FAILED when merging invoice ends 400', () => {
    return testInvalidMergeInvoice(400)
  })

  it('creates UPDATING_INVOICES_FAILED when merging invoice ends 401', () => {
    return testInvalidMergeInvoice(401)
  })

  it('creates DELETING_INVOICE_SUCCEEDED when deleting invoice is done', () => {
    nock(BASE_URL)
      .delete(/^\/invoices/)
      .reply(200)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.DELETING_INVOICE },
      { type: types.FETCHING_ENDED },
      { type: types.DELETING_INVOICE_SUCCEEDED, id: invoice.id }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteInvoice(invoice.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidDeleteInvoice = (errorCode) => {
    nock(BASE_URL)
      .delete(/^\/invoices\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.DELETING_INVOICE },
      { type: types.FETCHING_ENDED },
      { type: types.DELETING_INVOICE_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteInvoice(invoice.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates DELETING_INVOICES_FAILED when deleting invoice ends 401', () => {
    return testInvalidDeleteInvoice(401)
  })

  it('creates DELETING_INVOICES_FAILED when deleting invoice ends 404', () => {
    return testInvalidDeleteInvoice(404)
  })
})

describe('redux actions for invoice items', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const invoiceItem = { id: 1, invoiceId: 0, description: 'invoice item' }

  it('creates CREATING_INVOICE_ITEM_SUCCEEDED when creating item is done', () => {
    const responseHeaders = {
      'invoice-amount': '100'
    }

    nock(BASE_URL)
      .post(/^\/invoices\/[\d]+\/items/)
      .reply(201, invoiceItem, responseHeaders)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.CREATING_INVOICE_ITEM, payload: invoiceItem },
      { type: types.FETCHING_ENDED },
      { type: types.CREATING_INVOICE_ITEM_SUCCEEDED,
        invoiceId: invoiceItem.invoiceId,
        invoiceAmount: '100',
        payload: normalize(invoiceItem, schema.invoiceItem) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.createInvoiceItem(invoiceItem.invoiceId,
                                                    invoiceItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidCreateInvoiceItem = (errorCode) => {
    nock(BASE_URL)
      .post(/^\/invoices\/[\d]+\/items/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.CREATING_INVOICE_ITEM, payload: invoiceItem },
      { type: types.FETCHING_ENDED },
      { type: types.CREATING_INVOICE_ITEM_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.createInvoiceItem(invoiceItem.invoiceId,
                                                    invoiceItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates CREATING_INVOICE_ITEM_FAILED when creating item ends 400', () => {
    return testInvalidCreateInvoiceItem(400)
  })

  it('creates CREATING_INVOICE_ITEM_FAILED when creating item ends 401', () => {
    return testInvalidCreateInvoiceItem(401)
  })

  it('creates UPDATING_INVOICE_ITEM_SUCCEEDED when updating item is done', () => {
    const responseHeaders = {
      'invoice-amount': '100'
    }

    nock(BASE_URL)
      .put(/^\/invoices\/[\d]+\/items/)
      .reply(200, invoiceItem, responseHeaders)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE_ITEM, payload: invoiceItem },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_ITEM_SUCCEEDED,
        invoiceId: invoiceItem.invoiceId,
        invoiceAmount: '100',
        payload: normalize(invoiceItem, schema.invoiceItem) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateInvoiceItem(invoiceItem.invoiceId,
                                                    invoiceItem.id,
                                                    invoiceItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidUpdateInvoiceItem = (errorCode) => {
    nock(BASE_URL)
      .put(/^\/invoices\/[\d]+\/items/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE_ITEM, payload: invoiceItem },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_ITEM_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateInvoiceItem(invoiceItem.invoiceId,
                                                    invoiceItem.id,
                                                    invoiceItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_INVOICE_ITEM_FAILED when updating item ends 401', () => {
    return testInvalidUpdateInvoiceItem(401)
  })

  it('creates UPDATING_INVOICE_ITEM_FAILED when updating item ends 404', () => {
    return testInvalidUpdateInvoiceItem(404)
  })

  it('creates UPDATING_INVOICE_ITEM_SUCCEEDED when merging item is done', () => {
    const responseHeaders = {
      'invoice-amount': '100'
    }

    nock(BASE_URL)
      .patch(/^\/invoices\/[\d]+\/items/)
      .reply(200, invoiceItem, responseHeaders)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE_ITEM, payload: invoiceItem },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_ITEM_SUCCEEDED,
        invoiceId: invoiceItem.invoiceId,
        invoiceAmount: '100',
        payload: normalize(invoiceItem, schema.invoiceItem) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.mergeInvoiceItem(invoiceItem.invoiceId,
                                                   invoiceItem.id,
                                                   invoiceItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidMergeInvoiceItem = (errorCode) => {
    nock(BASE_URL)
      .patch(/^\/invoices\/[\d]+\/items/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_INVOICE_ITEM, payload: invoiceItem },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_INVOICE_ITEM_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.mergeInvoiceItem(invoiceItem.invoiceId,
                                                   invoiceItem.id,
                                                   invoiceItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_INVOICE_ITEM_FAILED when merging item ends 401', () => {
    return testInvalidMergeInvoiceItem(401)
  })

  it('creates UPDATING_INVOICE_ITEM_FAILED when merging item ends 404', () => {
    return testInvalidMergeInvoiceItem(404)
  })

  it('creates DELETING_INVOICE_ITEM_SUCCEEDED when deleting item is done', () => {
    const responseHeaders = {
      'invoice-amount': '100'
    }

    nock(BASE_URL)
      .delete(/^\/invoices\/[\d]+\/items\/[\d]+/)
      .reply(200, '', responseHeaders)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.DELETING_INVOICE_ITEM },
      { type: types.FETCHING_ENDED },
      { type: types.DELETING_INVOICE_ITEM_SUCCEEDED,
        invoiceId: invoiceItem.invoiceId,
        invoiceAmount: '100',
        id: invoiceItem.id }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteInvoiceItem(invoiceItem.invoiceId,
                                                    invoiceItem.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidDeleteInvoiceItem = (errorCode) => {
    nock(BASE_URL)
      .delete(/^\/invoices\/[\d]+\/items\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.DELETING_INVOICE_ITEM },
      { type: types.FETCHING_ENDED },
      { type: types.DELETING_INVOICE_ITEM_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteInvoiceItem(invoiceItem.invoiceId,
                                                    invoiceItem.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates DELETING_INVOICE_ITEM_FAILED when deleting item ends 401', () => {
    return testInvalidDeleteInvoiceItem(401)
  })

  it('creates DELETING_INVOICE_ITEM_FAILED when deleting item ends 404', () => {
    return testInvalidDeleteInvoiceItem(404)
  })
})

describe('redux actions for users', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const user = { id: 0, name: 'user', email: 'user@user.com' }

  it('creates LOADING_USERS_SUCCEEDED when loading users is done', () => {
    nock(BASE_URL)
      .get(/^\/users/)
      .reply(200, [user])

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_USERS },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_USERS_SUCCEEDED,
        payload: normalize([user], [schema.user]) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidLoadUsers = (errorCode) => {
    nock(BASE_URL)
      .get(/^\/users/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_USERS },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_USERS_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates LOADING_USERS_FAILED when loading users ends 401', () => {
    return testInvalidLoadUsers(401)
  })

  it('creates LOADING_USERS_SUCCEEDED when loading user is done', () => {
    nock(BASE_URL)
      .get(/^\/users\/[\d]+/)
      .reply(200, user)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_USERS },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_USERS_SUCCEEDED,
        payload: normalize(user, schema.user) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadUser(user.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidLoadUser = (errorCode) => {
    nock(BASE_URL)
      .get(/^\/users\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_USERS },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_USERS_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.loadUser(user.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates LOADING_USERS_FAILED when loading user ends 401', () => {
    return testInvalidLoadUser(401)
  })

  it('creates LOADING_USERS_FAILED when loading user ends 404', () => {
    return testInvalidLoadUser(404)
  })

  it('creates CREATING_USER_SUCCEEDED when creating user is done', () => {
    const requestHeaders = {
      reqheaders: {
        encp: stringToBase64('password')
      }
    }

    nock(BASE_URL, requestHeaders)
      .post(/^\/users/)
      .reply(201, user)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.CREATING_USER, payload: user },
      { type: types.FETCHING_ENDED },
      { type: types.CREATING_USER_SUCCEEDED,
        payload: normalize(user, schema.user) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.createUser(user, 'password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidCreateUser = (errorCode) => {
    const requestHeaders = {
      reqheaders: {
        encp: stringToBase64('password')
      }
    }

    nock(BASE_URL, requestHeaders)
      .post(/^\/users/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.CREATING_USER, payload: user },
      { type: types.FETCHING_ENDED },
      { type: types.CREATING_USER_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.createUser(user, 'password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates CREATING_USER_FAILED when creating user ends 400', () => {
    return testInvalidCreateUser(400)
  })

  it('creates CREATING_USER_FAILED when creating user ends 401', () => {
    return testInvalidCreateUser(401)
  })

  it('creates UPDATING_USER_SUCCEEDED when updating user is done', () => {
    nock(BASE_URL)
      .put(/^\/users\/[\d]+/)
      .reply(200, user)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER, payload: user },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_SUCCEEDED,
        payload: normalize(user, schema.user) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateUser(user.id, user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidUpdateUser = (errorCode) => {
    nock(BASE_URL)
      .put(/^\/users\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER, payload: user },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateUser(user.id, user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_USER_FAILED when updating user ends 401', () => {
    return testInvalidUpdateUser(401)
  })

  it('creates UPDATING_USER_FAILED when creating user ends 404', () => {
    return testInvalidUpdateUser(404)
  })

  it('creates UPDATING_USER_SUCCEEDED when merging user is done', () => {
    nock(BASE_URL)
      .patch(/^\/users\/[\d]+/)
      .reply(200, user)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER, payload: user },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_SUCCEEDED,
        payload: normalize(user, schema.user) }
    ]

    const store = mockStore({})

    return store.dispatch(actions.mergeUser(user.id, user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidMergeUser = (errorCode) => {
    nock(BASE_URL)
      .patch(/^\/users\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER, payload: user },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.mergeUser(user.id, user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_USER_FAILED when merging user ends 401', () => {
    return testInvalidMergeUser(401)
  })

  it('creates UPDATING_USER_FAILED when merging user ends 404', () => {
    return testInvalidMergeUser(404)
  })

  it('creates DELETING_USER_SUCCEEDED when deleting user is done', () => {
    nock(BASE_URL)
      .delete(/^\/users/)
      .reply(200)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.DELETING_USER },
      { type: types.FETCHING_ENDED },
      { type: types.DELETING_USER_SUCCEEDED, id: user.id }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteUser(user.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidDeleteUser = (errorCode) => {
    nock(BASE_URL)
      .delete(/^\/users\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.DELETING_USER },
      { type: types.FETCHING_ENDED },
      { type: types.DELETING_USER_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteUser(user.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates DELETING_USERS_FAILED when deleting user ends 401', () => {
    return testInvalidDeleteUser(401)
  })

  it('creates DELETING_USERS_FAILED when deleting user ends 404', () => {
    return testInvalidDeleteUser(404)
  })

  it('creates UPDATING_USER_PASSWORD_SUCCEEDED when updating account ' +
     'password is done', () => {
    const requestHeaders = {
      reqheaders: {
        'encp': stringToBase64('new-password'),
        'encp-old': stringToBase64('current-password')
      }
    }

    nock(BASE_URL, requestHeaders)
      .patch(/^\/users\/[\d]+/)
      .reply(200, user)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER_PASSWORD },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_PASSWORD_SUCCEEDED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateUserPassword(user.id, 'new-password',
                                                     'current-password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidUpdateAccountPassword = (errorCode) => {
    const requestHeaders = {
      reqheaders: {
        'encp': stringToBase64('new-password'),
        'encp-old': stringToBase64('current-password')
      }
    }

    nock(BASE_URL, requestHeaders)
      .patch(/^\/users\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER_PASSWORD },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_PASSWORD_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateUserPassword(user.id, 'new-password',
                                                     'current-password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_USERS_PASSWORD_FAILED when updating account password ' +
     'ends 401', () => {
    return testInvalidUpdateAccountPassword(401)
  })

  it('creates UPDATING_USERS_PASSWORD_FAILED when updating account password ' +
     'ends 404', () => {
    return testInvalidUpdateAccountPassword(404)
  })

  it('creates UPDATING_USER_PASSWORD_SUCCEEDED when updating user password ' +
     'is done', () => {
    const requestHeaders = {
      reqheaders: {
        'encp': stringToBase64('new-password')
      }
    }
    nock(BASE_URL, requestHeaders)
      .patch(/^\/users\/[\d]+/)
      .reply(200, user)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER_PASSWORD },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_PASSWORD_SUCCEEDED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateUserPassword(user.id, 'new-password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  const testInvalidUpdateUserPassword = (errorCode) => {
    const requestHeaders = {
      reqheaders: {
        'encp': stringToBase64('new-password')
      }
    }

    nock(BASE_URL, requestHeaders)
      .patch(/^\/users\/[\d]+/)
      .reply(errorCode)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.UPDATING_USER_PASSWORD },
      { type: types.FETCHING_ENDED },
      { type: types.UPDATING_USER_PASSWORD_FAILED }
    ]

    const store = mockStore({})

    return store.dispatch(actions.updateUserPassword(user.id, 'new-password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_USERS_PASSWORD_FAILED when updating user password ' +
     'ends 401', () => {
    return testInvalidUpdateUserPassword(401)
  })

  it('creates UPDATING_USERS_PASSWORD_FAILED when updating user password ' +
     'ends 404', () => {
    return testInvalidUpdateUserPassword(404)
  })
})
