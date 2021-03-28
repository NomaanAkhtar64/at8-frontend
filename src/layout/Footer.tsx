import React from 'react'

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className='main-footer'>
      <div className='footer'>
        {/* <div className="help">
                    <h3>Help</h3>
                </div> */}
        <div className='contact'>
          <div className='links'>
            <div className='copyright'>
              <span>Copyright © 2021 AT8. All rights reserved</span>
            </div>
            <div className='socials'>
              <div className='link pl-3'>
                <a
                  className='footer-link'
                  href='https://www.facebook.com/At8ESports/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    className='bi bi-facebook'
                    viewBox='0 0 16 16'
                  >
                    <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
                  </svg>
                </a>
              </div>
              <div className='link'>
                <a
                  className='footer-link'
                  href='https://www.instagram.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    className='bi bi-instagram'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z' />
                  </svg>
                </a>
              </div>
              <div className='link'>
                <a
                  className='footer-link'
                  href='https://discord.gg/92f6ZBKafN'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    className='bi bi-discord'
                    viewBox='0 0 16 16'
                  >
                    <path d='M6.552 6.712c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888.008-.488-.36-.888-.816-.888zm2.92 0c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888s-.36-.888-.816-.888z' />
                    <path d='M13.36 0H2.64C1.736 0 1 .736 1 1.648v10.816c0 .912.736 1.648 1.64 1.648h9.072l-.424-1.48 1.024.952.968.896L15 16V1.648C15 .736 14.264 0 13.36 0zm-3.088 10.448s-.288-.344-.528-.648c1.048-.296 1.448-.952 1.448-.952-.328.216-.64.368-.92.472-.4.168-.784.28-1.16.344a5.604 5.604 0 0 1-2.072-.008 6.716 6.716 0 0 1-1.176-.344 4.688 4.688 0 0 1-.584-.272c-.024-.016-.048-.024-.072-.04-.016-.008-.024-.016-.032-.024-.144-.08-.224-.136-.224-.136s.384.64 1.4.944c-.24.304-.536.664-.536.664-1.768-.056-2.44-1.216-2.44-1.216 0-2.576 1.152-4.664 1.152-4.664 1.152-.864 2.248-.84 2.248-.84l.08.096c-1.44.416-2.104 1.048-2.104 1.048s.176-.096.472-.232c.856-.376 1.536-.48 1.816-.504.048-.008.088-.016.136-.016a6.521 6.521 0 0 1 4.024.752s-.632-.6-1.992-1.016l.112-.128s1.096-.024 2.248.84c0 0 1.152 2.088 1.152 4.664 0 0-.68 1.16-2.448 1.216z' />
                  </svg>
                </a>
              </div>
              <div className='link'>
                <a
                  className='footer-link'
                  href='mailto:at8rippix@gmail.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    className='bi bi-envelope-open'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.818l5.724 3.465L8 8.917l1.276.766L15 6.218V5.4a1 1 0 0 0-.53-.882l-6-3.2zM15 7.388l-4.754 2.877L15 13.117v-5.73zm-.035 6.874L8 10.083l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738zM1 13.117l4.754-2.852L1 7.387v5.73zM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2z' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='credits'>
          <p>
            Created by{' '}
            <a
              rel='noreferrer'
              href='https://www.facebook.com/profile.php?id=100009911056732'
              target='_blank'
            >
              Nomaan
            </a>{' '}
            and{' '}
            <a
              rel='noreferrer'
              href='https://shiekhahmed135.wordpress.com/'
              target='_blank'
            >
              Ahmed
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
