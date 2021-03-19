import React from 'react'

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className='main-footer'>
      <div className='footer'>
        <div className='help'>
          <h3>Help</h3>
        </div>
        <div className='contact'>
          <h3>Contact</h3>
          <div className='links'>
            <a
              className='footer-link'
              href='https://www.facebook.com'
              target='_blank'
            >
              Facebook
            </a>
            <a
              className='footer-link'
              href='https://www.instagram.com'
              target='_blank'
            >
              Instagram
            </a>
            <a
              className='footer-link'
              href='https://discord.gg/92f6ZBKafN'
              target='_blank'
            >
              Discord
            </a>
            <a
              className='footer-link'
              href='mailto:at8rippix@gmail.com'
              target='_blank'
            >
              Email
            </a>
          </div>
        </div>
      </div>
      <div className='copyright'>
        <p>Copyright © 2021 AT8. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
