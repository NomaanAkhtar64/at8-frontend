import React from 'react'

interface HeaderProps {
  name: string
  logo: string
}

const Header: React.FC<HeaderProps> = ({ name, logo, children }) => {
  return (
    <header>
      <div className='site-base'>
        <div className='site-name'>{name}</div>
        <div className='site-logo'>{logo}</div>
      </div>
      <div className='site-nav'>{children}</div>
    </header>
  )
}

export default Header
