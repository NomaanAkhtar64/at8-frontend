import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import useWindowSize from '../hooks/useWindowSize'

interface SidebarProps {
  closeSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ children, closeSidebar }) => {
  const { width } = useWindowSize()

  useEffect(() => {
    if (width > 992) {
      closeSidebar()
    }
  }, [width, closeSidebar])
  const { pathname } = useLocation()

  const counter = useRef(0)
  useEffect(() => {
    if (counter.current !== 0) {
      closeSidebar()
    }
    counter.current++
  }, [pathname, closeSidebar])

  return (
    <div className='sidebar'>
      <div className='sidebar-head'>
        <button className='sidebar-close' onClick={() => closeSidebar()}>
          <svg
            focusable='false'
            viewBox='0 0 24 24'
            aria-hidden='true'
            width='48px'
            height='48px'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
          </svg>
        </button>
      </div>
      <div className='sidebar-nav'>{children}</div>
    </div>
  )
}

export default Sidebar
