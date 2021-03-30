import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState: UserState = {
  token: localStorage.getItem('token') || null,
  error: null,
  loading: false,
}

const authStart = (state: UserState, action) => {
  return updateObject<UserState>(state, {
    error: null,
    loading: true,
  })
}

const authSuccess = (state, action) => {
  return updateObject<UserState>(state, {
    token: action.token,
    error: null,
    loading: false,
  })
}

const authClearError = (state, action) => {
  return updateObject<UserState>(state, {
    error: null,
    loading: false,
  })
}

const authFail = (state, action) => {
  return updateObject<UserState>(state, {
    error: action.error,
    loading: false,
  })
}

const authLogout = (state, action) => {
  return updateObject<UserState>(state, {
    token: null,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action)
    case actionTypes.AUTH_CLEAR_ERROR:
      return authClearError(state, action)
    default:
      return state
  }
}

export default reducer
