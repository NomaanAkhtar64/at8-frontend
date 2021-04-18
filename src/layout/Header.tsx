import React from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import backDrop from '../assets/header-backdrop.png'
import AT8 from '../assets/AT8 logo - Copy.png'
import * as actions from '../store/actions/auth'
import Dropdown from '../components/Dropdown'
import DropDownItem from '../components/DropDownItem'
import defaultProfilePic from '../assets/default-profile-picture.png'
import useProfile from '../hooks/useProfile'

interface HeaderProps {
  name: string | React.ReactElement
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
  const history = useHistory()
  const profile = useProfile()
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
          >
            <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path>
          </svg>
        </div>
      )}
      <div className='header-wrapper'>
        <div className='site-name'>
          <Link to='/'>
            <img src={AT8} alt='AT8' style={{ marginTop: '-2px' }} />
          </Link>
        </div>
        <div className='site-nav'>{children}</div>
        <div className='header-backdrop'>
          <img className='header-shadow' src={backDrop} alt='' />
        </div>
        <div className='account'>
          {isAuthenticated ? (
            <>
              <Dropdown
                name={
                  <img
                    src={
                      profile.profile.pic
                        ? profile.profile.pic
                        : defaultProfilePic
                    }
                    className='profile-pic'
                    onDoubleClick={() => {
                      history.push('/profile/settings')
                    }}
                    style={{
                      marginRight: 10,
                    }}
                    alt=''
                  />
                }
                variant='purple'
              >
                <DropDownItem text='Settings' to='/profile/settings' />
                <DropDownItem text='My Entries' to='/profile/entries' />
                <DropDownItem text='My Teams' to='/profile/teams' />
                <DropDownItem text='Logout' onClick={() => onLogout()} />
              </Dropdown>
            </>
          ) : (
            <Link
              to='/signup'
              className='link-shadow link-animated_und'
              style={{ textDecoration: 'none' }}
            >
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
