import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import './Layout'
import backDrop from '../assets/header-backdrop.png'
import AT8 from '../assets/AT8 logo - Copy.png'

interface StrippedLayoutProps {}

const StrippedLayout: React.FC<StrippedLayoutProps> = ({ children }) => {
  return (
    <>
      <header className='main-header'>
        <div className='header-wrapper'>
          <div className='site-name'>
            <Link to='/'>
              <img src={AT8} alt='AT8' style={{ marginTop: '-2px' }} />
            </Link>
          </div>
          <div className='header-backdrop'>
            <img className='header-shadow' src={backDrop} alt='' />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default StrippedLayout
