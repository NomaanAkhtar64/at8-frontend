import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import * as actions from '../store/actions/auth'
import { useHistory } from 'react-router'
import Error from '../components/Error'
import Form from '../components/Form'
import { Values } from '../func/valueType'
import * as regex from '../regex'
import Field from '../components/Field'

interface SignupProps extends UserState {
  onSignUp: (
    username: string,
    email: string,
    password1: string,
    password2: string
  ) => void
}
interface FormInf extends Values {
  username: string
  email: string
  password: string
  passwordRe: string
}
const Signup: React.FC<SignupProps> = ({ onSignUp }) => {
  const history = useHistory()
  const [isDisabled, setDisable] = useState(false)
  const [serverError, setServerError] = useState<null | string>(null)

  return (
    <Form
      formClass='form'
      submitClass='btn btn-secondary signup-btn'
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      disable={isDisabled}
      validate={{
        username: { required: true },
        email: { required: true, regex: regex.EMAIL },
        password: { required: true, equal: 'confirmPassword', minLength: 8 },
        confirmPassword: { required: true },
      }}
      onSubmit={(v: FormInf, e) => {
        setServerError(null)
        setDisable(true)
        axios
          .post('https://at8-backend.herokuapp.com/check-user/', {
            username: v.username,
            email: v.email,
          })
          .then((res) => {
            onSignUp(v.username, v.email, v.password, v.passwordRe)
            history.push('/login')
            setDisable(true)
          })
          .catch((err) => {
            if (err.response) {
              setServerError(err.response.data)
            }
            setDisable(false)
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
    </Form>
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
