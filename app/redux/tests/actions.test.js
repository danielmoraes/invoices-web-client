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

const user = { id: 0, name: 'user', email: 'user@user.com' }

describe('redux actions for authentication', () => {
  afterEach(() => {
    nock.cleanAll()
  })

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

  const invoice = { id: 0, description: 'invoice' }

  it('creates LOADING_INVOICES_SUCCEEDED when loading invoices is done', () => {
    nock(BASE_URL)
      .get(/^\/invoices/)
      .reply(200, [invoice])

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_INVOICES },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_INVOICES_SUCCEEDED,
        payload: normalize([invoice], [schema.invoice]) }
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
    testInvalidLoadInvoices(401)
  })

  it('creates LOADING_INVOICES_SUCCEEDED when loading invoice is done', () => {
    nock(BASE_URL)
      .get(/^\/invoices\/[\d]+/)
      .reply(200, invoice)

    const expectedActions = [
      { type: types.FETCHING },
      { type: types.LOADING_INVOICES },
      { type: types.FETCHING_ENDED },
      { type: types.LOADING_INVOICES_SUCCEEDED,
        payload: normalize(invoice, schema.invoice) }
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
    testInvalidLoadInvoice(401)
  })

  it('creates LOADING_INVOICES_FAILED when loading invoice ends 404', () => {
    testInvalidLoadInvoice(404)
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
    testInvalidCreateInvoice(400)
  })

  it('creates CREATING_INVOICES_FAILED when creating invoice ends 401', () => {
    testInvalidCreateInvoice(401)
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

    const store = mockStore()

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

    const store = mockStore()

    return store.dispatch(actions.updateInvoice(invoice.id, invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_INVOICES_FAILED when updating invoice ends 400', () => {
    testInvalidUpdateInvoice(400)
  })

  it('creates UPDATING_INVOICES_FAILED when updating invoice ends 401', () => {
    testInvalidUpdateInvoice(401)
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

    const store = mockStore()

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

    const store = mockStore()

    return store.dispatch(actions.mergeInvoice(invoice.id, invoice))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates UPDATING_INVOICES_FAILED when merging invoice ends 400', () => {
    testInvalidMergeInvoice(400)
  })

  it('creates UPDATING_INVOICES_FAILED when merging invoice ends 401', () => {
    testInvalidMergeInvoice(401)
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

    const store = mockStore()

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
      { type: types.DElETING_INVOICE_FAILED }
    ]

    const store = mockStore()

    return store.dispatch(actions.deleteInvoice(invoice.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  it('creates DELETING_INVOICES_FAILED when deleting invoice ends 401', () => {
    testInvalidDeleteInvoice(401)
  })

  it('creates DELETING_INVOICES_FAILED when deleting invoice ends 404', () => {
    testInvalidDeleteInvoice(404)
  })
})
