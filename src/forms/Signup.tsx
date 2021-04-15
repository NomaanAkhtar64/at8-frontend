import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import * as actions from '../store/actions/auth'
import { useHistory } from 'react-router'
import Error from '../components/Error'
import { default as SForm } from '../components/Form'
import { Values } from '../func/valueType'
import * as regex from '../regex'
import Field from '../components/Field'

const arrToStr = (a: string[] | string) => {
  if (Array.isArray(a)) {
    return a.join('&nbsp;')
  }
  return a
}

interface SignupProps extends UserState {
  onSignUp: (
    username: string,
    email: string,
    password1: string,
    password2: string
  ) => void
  hasSignedIn: boolean
}
interface FormInf extends Values {
  username: string
  email: string
  password: string
  confirmPassword: string
}
const Signup: React.FC<SignupProps> = ({
  onSignUp,
  hasSignedIn,
  error,
  loading,
}) => {
  const history = useHistory()
  const [serverError, setServerError] = useState<null | string>(null)
  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        let data = error.response.data
        if ('non_field_error' in data) {
          setServerError(arrToStr(error.response.data.non_field_error))
        }
      }
    }
  }, [error])

  useEffect(() => {
    if (hasSignedIn) {
      history.push('/login')
    }
  }, [hasSignedIn, history])

  return (
    <SForm
      formClass='form'
      submitClass='btn btn-secondary signup-btn'
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      disable={loading}
      validate={{
        username: { required: true },
        email: { required: true, regex: regex.EMAIL },
        password: { required: true, equal: 'confirmPassword', minLength: 8 },
        confirmPassword: { required: true },
      }}
      onSubmit={(v: FormInf, e) => {
        setServerError(null)
        axios
          .post('https://at8-backend.herokuapp.com/check-user/', {
            username: v.username,
            email: v.email,
          })
          .then((res) => {
            onSignUp(v.username, v.email, v.password, v.confirmPassword)
          })
          .catch((err) => {
            if (axios.isAxiosError(err)) {
              let data = err.response.data
              if ('email' in data) {
                setServerError(arrToStr(error.response.data.email))
              }
              if ('username' in data) {
                setServerError(arrToStr(error.response.data.username))
              }
            }
          })
      }}
    >
      {serverError && <Error>{serverError}</Error>}
      <legend className='mb-4'>Signup</legend>
      <Field name='username' type='text' placeholder />
      <Field name='email' type='email' placeholder />
      <Field name='password' type='password' placeholder>
        <small>
          <ul>
            <li>Password must contain alteast 8 characters.</li>
          </ul>
        </small>
      </Field>
      <Field name='confirmPassword' type='password' placeholder />
    </SForm>
  )
}

function mapStateToProps(
  state: UserState
): Partial<UserState> & { hasSignedIn: boolean; serverError: Error } {
  return {
    loading: state.loading,
    serverError: state.error,
    hasSignedIn: state.token !== null,
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
