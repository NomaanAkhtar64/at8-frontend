import React, { useState } from 'react'

import useProfile from '../../hooks/useProfile'

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')

  const profile = useProfile()

  return (
    <div className='profile-data'>
      <div className='profile-pic'>
        <form>
          <legend>Profile Picture</legend>

          <div className='form-group'>
            <div className='input-group mb-3'>
              <div className='custom-file'>
                <input
                  type='file'
                  accept='image/*'
                  className='custom-file-input'
                  id='inputGroupFile02'
                />
                <label className='custom-file-label'>Choose file</label>
              </div>
            </div>
          </div>
          <div className='btns'>
            <button type='submit' className='btn btn-success'>
              Upload
            </button>
          </div>
        </form>
      </div>
      <div className='profile'>
        <form>
          <legend style={{ textAlign: 'center' }}>Profile</legend>
          <div className='mb-3'>
            <label>Username</label>
            <input
              type='text'
              className='form-control'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label>Email</label>
            <input
              type='email'
              placeholder='email@example.com'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label>First name</label>
            <input
              type='text'
              className='form-control'
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control'
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label>Discord name with tag</label>
            <input
              type='text'
              className='form-control'
              placeholder='name#tag'
            />
          </div>
          <div className='btns'>
            <button type='submit' className='btn btn-success profile-btn'>
              Save
            </button>
            <button type='button' className='btn btn-danger profile-btn'>
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className='password-form '>
        <form>
          <legend>Change Password</legend>
          <div className='mb-3'>
            <label>Current Password</label>
            <input
              type='password'
              placeholder='Current Password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label>New Password</label>
            <input
              type='password'
              placeholder='New Password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label>Confirm Password</label>
            <input
              type='password'
              placeholder='Re-enter Password'
              className='form-control'
            />
          </div>
          <div className='btns'>
            <button type='submit' className='btn btn-success profile-btn'>
              Save
            </button>
            <button type='button' className='btn btn-danger profile-btn'>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings
