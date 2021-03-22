import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import backDrop from '../assets/header-backdrop.png'
import logo from '../assets/AT8-Logo.png'
import * as actions from '../store/actions/auth'

interface HeaderProps {
  name: string
  isSidebarOpen: boolean
  openSidebar: () => void
  isAuthenticated: boolean
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({
  name,
  children,
  isSidebarOpen,
  openSidebar,
  isAuthenticated,
  onLogout,
}) => {
  return (
    <header className='main-header'>
      {!isSidebarOpen && (
        <div
          className='open-sidebar'
          onClick={() => {
            openSidebar()
          }}
        >
          <svg
            className='MuiSvgIcon-root jss174'
            focusable='false'
            viewBox='0 0 24 24'
            aria-hidden='true'
            width='40px'
          >
            <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path>
          </svg>
        </div>
      )}
      <div className='header-wrapper'>
        <div className='site-name'>
          <Link to='/'>
            {/* {name} */}
            <img
              src={logo}
              alt='AT8'
              width='46px'
              style={{ marginTop: '-2px' }}
            />
          </Link>
        </div>
        <div className='site-nav'>{children}</div>
        <div className='header-backdrop'>
          <img className='header-shadow' src={backDrop} alt='' />
        </div>
        <div className='account'>
          {isAuthenticated ? (
            <div
              className='link-shadow link-animated_und'
              style={{ cursor: 'pointer' }}
              onClick={() => onLogout()}
            >
              Logout
            </div>
          ) : (
            <Link to='/signup' className='link-shadow link-animated_und'>
              SIGNUP
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state: UserState) => {
  return {
    isAuthenticated: state.token !== null,
  }
}
const mapDispatchToProps = (dispatchEvent) => {
  return {
    onLogout: () => dispatchEvent(actions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
