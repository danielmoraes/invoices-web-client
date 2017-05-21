import expect from 'expect'

import reducer from '../reducers/app'
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
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle FETCHING', () => {
    const state = { ...initialState, pendingRequests: 5 }
    expect(
      reducer(state, {
        type: types.FETCHING
      })
    ).toEqual({ ...state, pendingRequests: 6 })
  })

  it('should handle FETCHING_ENDED', () => {
    const state = { ...initialState, pendingRequests: 5 }
    expect(
      reducer(state, {
        type: types.FETCHING_ENDED
      })
    ).toEqual({ ...state, pendingRequests: 4 })
  })

  it('should handle LOADING_AUTH_USER', () => {
    const state = { ...initialState, isLoaded: true, showLoadingOverlay: false }

    expect(
      reducer(state, {
        type: types.LOADING_AUTH_USER
      })
    ).toEqual({ ...state, isLoaded: false, showLoadingOverlay: true })
  })

  it('should handle LOADING_AUTH_USER_SUCCEEDED', () => {
    const state = { ...initialState, isLoaded: false, showLoadingOverlay: true }
    expect(
      reducer(state, {
        type: types.LOADING_AUTH_USER_SUCCEEDED
      })
    ).toEqual({ ...state, isLoaded: true, showLoadingOverlay: false })
  })

  it('should handle LOADING_AUTH_USER_FAILED', () => {
    const state = { ...initialState, isLoaded: false, showLoadingOverlay: true }
    expect(
      reducer(state, {
        type: types.LOADING_AUTH_USER_FAILED
      })
    ).toEqual({ ...state, isLoaded: true, showLoadingOverlay: false })
  })

  it('should handle SIGN_IN_CANCEL', () => {
    const state = { ...initialState, signInFailed: true }
    expect(
      reducer(state, {
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
      reducer(state, {
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
      reducer(state, {
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
      reducer(state, {
        type: types.SIGNING_IN_FAILED
      })
    ).toEqual({ ...state, signInFailed: true, showLoadingOverlay: false })
  })

  it('should handle SIGNING_OUT', () => {
    const state = { ...initialState, showLoadingOverlay: false }
    expect(
      reducer(state, {
        type: types.SIGNING_OUT
      })
    ).toEqual({ ...state, showLoadingOverlay: true })
  })

  it('should handle SIGNING_OUT_SUCCEEDED', () => {
    const state = { ...initialState, showLoadingOverlay: true }
    expect(
      reducer(state, {
        type: types.SIGNING_OUT_SUCCEEDED
      })
    ).toEqual({ ...state, showLoadingOverlay: false })
  })

  it('should handle SIGNING_OUT_FAILED', () => {
    const state = { ...initialState, showLoadingOverlay: true }
    expect(
      reducer(state, {
        type: types.SIGNING_OUT_FAILED
      })
    ).toEqual({ ...state, showLoadingOverlay: false })
  })
})
