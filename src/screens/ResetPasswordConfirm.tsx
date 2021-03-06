import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'
import axios from 'axios'
import Loading from '../components/Loading'

import './ResetPasswordConfirm.scss'
import { __API_URL__ } from '../const'

interface ResetPasswordConfirmProps extends RouteComponentProps<{ token }> {}

const ResetPasswordConfirm: React.FC<ResetPasswordConfirmProps> = ({
  match,
}) => {
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)
  const [error, setError] = useState('')

  const history = useHistory()

  const token = match.params.token
  useEffect(() => {
    axios
      .get(`${__API_URL__}/check-token/?token=${token}`)
      .then((res) => {
        setIsTokenValid(true)
        setHasChecked(true)
        console.log(res.data)
      })
      .catch((err) => {
        setHasChecked(true)
        setIsTokenValid(false)
        console.log(err)
      })
  }, [token])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error !== '') {
        setError('')
      }
    }, 5000)
    return () => {
      clearInterval(timeout)
    }
  }, [error])

  if (hasChecked) {
    if (isTokenValid) {
      return (
        <>
          <div className='reset-password-confirm-page mt-5'>
            <div className='container'>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (pass1 !== pass2) {
                    setError("Password Doesn't match!")
                  }
                  if (pass1.length < 8) {
                    setError('Password must contain atleast 8 characters')
                  }
                  if (error !== '') {
                    console.log('Error occured')
                  } else {
                    axios
                      .post(`${__API_URL__}/api/reset-password-confirm/`, {
                        token,
                        pass1,
                        pass2,
                      })
                      .then((res) => {
                        console.log(res)
                        history.push('/')
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  }
                }}
              >
                <legend style={{ textAlign: 'center' }}>
                  Create a new Password
                </legend>
                <div className='form-group'>
                  <label>New Password</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='New Password'
                    required
                    value={pass1}
                    onChange={(e) => {
                      setPass1(e.target.value)
                    }}
                  />
                  <small>
                    <ul>
                      <li>Password must contain alteast 8 characters.</li>
                    </ul>
                  </small>
                </div>
                <div className='form-group'>
                  <label>Re-Enter Password</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Re-Enter the password'
                    required
                    value={pass2}
                    onChange={(e) => {
                      setPass2(e.target.value)
                    }}
                  />
                </div>
                <div className='form-group'>
                  <button type='submit' className='btn btn-success'>
                    Submit
                  </button>
                </div>
                <p>{error}</p>
              </form>
            </div>
          </div>
        </>
      )
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className='card text-white bg-dark my-5'
          style={{ maxWidth: '20rem', textAlign: 'center', margin: 'auto' }}
        >
          <div className='card-body'>
            <h4 className='card-title'>
              Error Loading Reset Page try again later.
            </h4>
          </div>
        </div>
      </div>
    )
  }
  return <Loading />
}

export default ResetPasswordConfirm
