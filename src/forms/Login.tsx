import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Error from '../components/Error'
import Form from '../components/Form'
import { Values } from '../func/valueType'
import Field from '../components/Field'
import useUser from '../hooks/user'
import axios from 'axios'
import Title from '../components/Title'

const Login: React.FC = () => {
  const history = useHistory()
  const { search } = history.location
  const [isDisabled, setDisable] = useState(false)
  const [error, setError] = useState('')
  const user = useUser()

  interface FormInf extends Values {
    email: string
    password: string
  }

  return (
    <>
      <Title>Login - AT8</Title>
      <Form
        initialValues={{ email: '', password: '' }}
        validate={{
          email: { required: true },
          password: { required: true },
        }}
        formClass='form'
        disable={isDisabled}
        onSubmit={async (sd: FormInf, e) => {
          setDisable(true)
          try {
            await user.actions.login(sd)
          } catch (err) {
            if (axios.isAxiosError(err)) {
              let data = err.response.data
              if ('non_field_errors' in data) {
                setError(data['non_field_errors'][0])
              }
            }
          }
          history.push('/')
          setDisable(false)
        }}
        submitClass='btn btn-secondary signup-btn'
      >
        {search.includes('redirect=true') && (
          <Error>You Need To Login First</Error>
        )}
        {error && <Error>{error}</Error>}
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

export default Login
