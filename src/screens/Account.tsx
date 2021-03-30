import React from 'react'
import { RouteComponentProps } from 'react-router'
import Login from '../forms/Login'
import Signup from '../forms/Signup'
import './Account.scss'

interface AccountProps extends RouteComponentProps<{}, {}, { email: string }> {}

const Account: React.FC<AccountProps> = ({ location, history }) => {
  const isSignup = location.pathname === '/signup'
  const isLogin = location.pathname.includes('/login')
  const isSignUpConfirm = location.pathname === '/signup/confirm'
  return (
    <>
      <div className='account-page'>
        <div className='page mt-md-5 pb-1'>
          <div className='tab'>
            <button
              className='btn tab-btn'
              type='button'
              style={{
                borderRadius: '0px',
                borderTopLeftRadius: '5px',
                background: isLogin ? 'black' : '#23233d',
              }}
              onClick={() => {
                history.push('/login')
              }}
            >
              LOGIN
            </button>
            <button
              className='btn tab-btn'
              type='button'
              style={{
                borderRadius: '0px',
                borderTopRightRadius: '5px',
                background: location.pathname.includes('/signup')
                  ? 'black'
                  : '#23233d',
              }}
              onClick={() => {
                history.push('/signup')
              }}
            >
              SIGNUP
            </button>
          </div>
          {isSignup && <Signup />}
          {isLogin && <Login />}
          {isSignUpConfirm && (
            <div className='signup-confirm'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z' />
                </svg>
              </div>
              <div>
                A Verification Email has been sent to{' '}
                <span className='text-primary'>{location.state.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Account
