import React from 'react'
import { Link } from 'react-router-dom'

import backDrop from '../assets/header-backdrop.png'

interface HeaderProps {
  name: string
  isSidebarOpen: boolean
  openSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({
  name,
  children,
  isSidebarOpen,
  openSidebar,
}) => {
  return (
    <header className='main-header'>
      {!isSidebarOpen && (
        <div
          className='open-sidebar'
          onClick={() => {
            openSidebar()
            console.log('Opening Sidebar')
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
          <Link to='/'>{name}</Link>
        </div>
        <div className='site-nav'>{children}</div>
        <div className='header-backdrop'>
          <img className='header-shadow' src={backDrop} alt='' />
        </div>
        <div className='account'>
          <Link to='/signup' className='link-shadow link-animated_und'>
            SIGNUP
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
