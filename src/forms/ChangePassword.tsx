import React, { useState } from 'react'
import checkPasswordChangeData from '../errors/check/checkPasswordChangeData'
import changePassword from '../hooks/changePassword'

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [password, setPassword] = useState('')
  const [passwordRe, setPasswordRe] = useState('')
  const [error, setError] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const { hasError, message } = checkPasswordChangeData(
          password,
          passwordRe
        )
        if (hasError) {
          setError(message)
        } else {
          changePassword(password, passwordRe)
        }
      }}
    >
      <legend>Change Password</legend>
      <div className='mb-3'>
        <label>New Password</label>
        <input
          type='password'
          placeholder='New Password'
          className='form-control'
          value={password}
          onChange={(e) => {
            if (e.target.value.length < 8) {
              setPassword(e.target.value)
            }
          }}
        />
      </div>
      <div className='mb-3'>
        <label>Confirm Password</label>
        <input
          type='password'
          placeholder='Re-enter Password'
          className='form-control'
          value={passwordRe}
          onChange={(e) => {
            setPasswordRe(e.target.value)
          }}
        />
      </div>
      <p style={{ color: 'red' }}>{error}</p>
      <div className='btns'>
        <button type='submit' className='btn btn-success profile-btn'>
          Save
        </button>
        <button
          type='button'
          className='btn btn-danger profile-btn'
          onClick={() => {
            setPassword('')
            setPasswordRe('')
          }}
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default ChangePassword
