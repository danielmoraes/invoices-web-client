import expect from 'expect'

import appReducer from '../reducers/app'
import authReducer from '../reducers/auth'
import * as types from '../actionTypes'

describe('app reducer', () => {
  const initialState = {
    isLoaded: false,
    signInFailed: false,
    showLoadingOverlay: false,
    pendingRequests: 0
  }

  it('should return the initial state', () => {
    expect(
      appReducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle FETCHING', () => {
    const state = { ...initialState, pendingRequests: 5 }
    expect(
      appReducer(state, {
        type: types.FETCHING
      })
    ).toEqual({ ...state, pendingRequests: 6 })
  })

  it('should handle FETCHING_ENDED', () => {
    const state = { ...initialState, pendingRequests: 5 }
    expect(
      appReducer(state, {
        type: types.FETCHING_ENDED
      })
    ).toEqual({ ...state, pendingRequests: 4 })
  })

  it('should handle LOADING_AUTH_USER', () => {
    const state = { ...initialState, isLoaded: true, showLoadingOverlay: false }

    expect(
      appReducer(state, {
        type: types.LOADING_AUTH_USER
      })
    ).toEqual({ ...state, isLoaded: false, showLoadingOverlay: true })
  })

  it('should handle LOADING_AUTH_USER_SUCCEEDED', () => {
    const state = { ...initialState, isLoaded: false, showLoadingOverlay: true }
    expect(
      appReducer(state, {
        type: types.LOADING_AUTH_USER_SUCCEEDED
      })
    ).toEqual({ ...state, isLoaded: true, showLoadingOverlay: false })
  })

  it('should handle LOADING_AUTH_USER_FAILED', () => {
    const state = { ...initialState, isLoaded: false, showLoadingOverlay: true }
    expect(
      appReducer(state, {
        type: types.LOADING_AUTH_USER_FAILED
      })
    ).toEqual({ ...state, isLoaded: true, showLoadingOverlay: false })
  })

  it('should handle SIGN_IN_CANCEL', () => {
    const state = { ...initialState, signInFailed: true }
    expect(
      appReducer(state, {
        type: types.SIGN_IN_CANCEL
      })
    ).toEqual({ ...state, signInFailed: false })
  })

  it('should handle SIGNING_IN', () => {
    const state = {
      ...initialState,
      signInFailed: true,
      showLoadingOverlay: false
    }

    expect(
      appReducer(state, {
        type: types.SIGNING_IN
      })
    ).toEqual({ ...state, signInFailed: false, showLoadingOverlay: true })
  })

  it('should handle SIGNING_IN_SUCCEEDED', () => {
    const state = {
      ...initialState,
      signInFailed: true,
      showLoadingOverlay: true
    }

    expect(
      appReducer(state, {
        type: types.SIGNING_IN_SUCCEEDED
      })
    ).toEqual({ ...state, signInFailed: false, showLoadingOverlay: false })
  })

  it('should handle SIGNING_IN_FAILED', () => {
    const state = {
      ...initialState,
      signInFailed: false,
      showLoadingOverlay: true
    }

    expect(
      appReducer(state, {
        type: types.SIGNING_IN_FAILED
      })
    ).toEqual({ ...state, signInFailed: true, showLoadingOverlay: false })
  })

  it('should handle SIGNING_OUT', () => {
    const state = { ...initialState, showLoadingOverlay: false }
    expect(
      appReducer(state, {
        type: types.SIGNING_OUT
      })
    ).toEqual({ ...state, showLoadingOverlay: true })
  })

  it('should handle SIGNING_OUT_SUCCEEDED', () => {
    const state = { ...initialState, showLoadingOverlay: true }
    expect(
      appReducer(state, {
        type: types.SIGNING_OUT_SUCCEEDED
      })
    ).toEqual({ ...state, showLoadingOverlay: false })
  })

  it('should handle SIGNING_OUT_FAILED', () => {
    const state = { ...initialState, showLoadingOverlay: true }
    expect(
      appReducer(state, {
        type: types.SIGNING_OUT_FAILED
      })
    ).toEqual({ ...state, showLoadingOverlay: false })
  })
})

describe('auth reducer', () => {
  const initialState = {
    user: {},
    isSigningOut: false
  }

  const user = { id: 0, name: 'user', email: 'user@user.com' }

  it('should return the initial state', () => {
    expect(
      authReducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle SIGNING_IN_SUCCEEDED', () => {
    const state = { ...initialState, user: {} }
    expect(
      authReducer(state, {
        type: types.SIGNING_IN_SUCCEEDED,
        payload: user
      })
    ).toEqual({ ...state, user })
  })

  it('should handle LOADING_AUTH_USER_SUCCEEDED', () => {
    const state = { ...initialState, user: {} }
    expect(
      authReducer(state, {
        type: types.LOADING_AUTH_USER_SUCCEEDED,
        payload: user
      })
    ).toEqual({ ...state, user })
  })

  it('should handle SIGNING_OUT', () => {
    const state = { ...initialState, isSigningOut: false }
    expect(
      authReducer(state, {
        type: types.SIGNING_OUT
      })
    ).toEqual({ ...state, isSigningOut: true })
  })

  it('should handle SIGNING_OUT_SUCCEEDED', () => {
    const state = { ...initialState, isSigningOut: true, user }
    expect(
      authReducer(state, {
        type: types.SIGNING_OUT_SUCCEEDED
      })
    ).toEqual({ ...state, isSigningOut: false, user: {} })
  })

  it('should handle SIGNING_OUT_FAILED', () => {
    const state = { ...initialState, isSigningOut: true, user }
    expect(
      authReducer(state, {
        type: types.SIGNING_OUT_FAILED
      })
    ).toEqual({ ...state, isSigningOut: false, user })
  })
})
