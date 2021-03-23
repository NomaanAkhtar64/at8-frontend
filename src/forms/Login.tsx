import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../store/actions/auth'
import checkLoginData from '../errors/check/checkLoginData'

interface LoginProps extends UserState {
  onAuth: (email: string, password: string) => void
}

const Login: React.FC<LoginProps> = ({ onAuth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  return (
    <form
      className='form'
      onSubmit={(e) => {
        e.preventDefault()
        let { hasError, message } = checkLoginData(email, password)
        if (hasError) {
          setError(message)
        } else {
          onAuth(email, password)
          history.push('/')
        }
      }}
    >
      <legend className='mb-4'>Login</legend>
      <div className='mb-3'>
        <input
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Email'
        />
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </div>
      {error !== '' && <div>{error}</div>}
      <div>
        <button type='submit' className='btn btn-secondary signup-btn'>
          LOGIN
        </button>
      </div>
      <div>
        <p className='forgot-password'>
          <Link to='/reset-password'>Forgot Password?</Link>
        </p>
      </div>
    </form>
  )
}
function mapStateToProps(state: UserState): Partial<UserState> {
  return {
    loading: state.loading,
    error: state.error,
  }
}

const mapsDispatchToProps = (dispatchEvent) => {
  return {
    onAuth: (email: string, password: string) =>
      dispatchEvent(actions.authLogin(email, password)),
  }
}

export default connect(mapStateToProps, mapsDispatchToProps)(Login)
