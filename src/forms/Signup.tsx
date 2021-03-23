import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { connect } from 'react-redux'

import * as actions from '../store/actions/auth'
import checkSignupData from '../errors/check/checkSignupData'

interface SignupProps extends UserState {
  onSignUp: (
    username: string,
    email: string,
    password1: string,
    password2: string
  ) => void
  toLogin: () => void
}

const Signup: React.FC<SignupProps> = ({ onSignUp, toLogin }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRe, setPasswordRe] = useState('')
  const [error, setError] = useState<null | string | Error | AxiosError>(null)

  return (
    <form
      className='form'
      onSubmit={(e) => {
        e.preventDefault()
        const { hasError, message } = checkSignupData(
          username,
          email,
          password,
          passwordRe
        )

        if (hasError) {
          setError(message)
          console.log(message)
        } else {
          axios
            .post('https://at8-backend.herokuapp.com/check-user/', {
              username: username,
              email: email,
            })
            .then((res) => {
              console.log(res.data)
              onSignUp(username, email, password, passwordRe)
              toLogin()
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }}
    >
      <legend className='mb-4'>Signup</legend>
      <div className='mb-3'>
        <input
          className='form-control'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='Username'
          required
        />
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <small>
          <ul>
            <li>Password must contain alteast 8 characters.</li>
          </ul>
        </small>
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          name='confirm'
          type='password'
          placeholder='Confirm Password'
          value={passwordRe}
          onChange={(e) => setPasswordRe(e.target.value)}
          required
        />
      </div>
      {error !== '' && <div>{error}</div>}
      <div>
        <button type='submit' className='btn btn-secondary signup-btn'>
          SIGNUP
        </button>
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
    onSignUp: (
      username: string,
      email: string,
      password1: string,
      password2: string
    ) =>
      dispatchEvent(actions.authSignup(username, email, password1, password2)),
  }
}

export default connect(mapStateToProps, mapsDispatchToProps)(Signup)
