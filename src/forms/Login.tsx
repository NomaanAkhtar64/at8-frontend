import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../store/actions/auth'
import Error from '../components/Error'
import { AxiosError } from 'axios'
import Form from '../components/Form'
import { Values } from '../func/valueType'
import Field from '../components/Field'
interface LoginProps extends UserState {
  onAuth: (email: string, password: string) => void
  serverError: AxiosError<{ non_field_errors: string[] }> | null
  isReqLoading: boolean
  clearServerError: () => void
}

const Login: React.FC<LoginProps> = ({
  onAuth,
  serverError,
  isReqLoading,
  clearServerError,
}) => {
  const history = useHistory()
  const { search } = history.location
  const [isDisabled, setDisable] = useState(false)

  useEffect(() => {
    if (!isReqLoading && isDisabled && !serverError) {
      history.push('/')
      setDisable(false)
    }
    if (serverError) {
      setDisable(false)
    }
  }, [isReqLoading, isDisabled, serverError, history])
  interface FormInf extends Values {
    email: string
    password: string
  }
  return (
    <>
      <Form
        initialValues={{ email: '', password: '' }}
        validate={{
          email: { required: true },
          password: { required: true },
        }}
        formClass='form'
        onSubmit={({ email, password }: FormInf, e) => {
          setDisable(true)
          clearServerError()
          onAuth(email, password)
        }}
        submitClass='btn btn-secondary signup-btn'
      >
        {search.includes('redirect=true') && (
          <Error>You Need To Login First</Error>
        )}
        <legend className='mb-4'>Login</legend>
        <Field name='email' type='email' placeholder />
        <Field name='password' type='password' placeholder />
      </Form>
      <div style={{ marginBottom: 20 }}>
        <p className='forgot-password'>
          <Link to='/reset-password'>Forgot Password?</Link>
        </p>
      </div>
    </>
  )
}

const mapStateToProps = (state: UserState) => {
  return {
    isReqLoading: state.loading,
    serverError: state.error,
  }
}

const mapsDispatchToProps = (dispatchEvent) => {
  return {
    onAuth: (email: string, password: string) =>
      dispatchEvent(actions.authLogin(email, password)),
    clearServerError: () => dispatchEvent(actions.authClearError()),
  }
}

export default connect(mapStateToProps, mapsDispatchToProps)(Login)
