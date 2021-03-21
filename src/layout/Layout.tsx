import React, { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import Dropdown from '../components/Dropdown'
import './Layout.scss'
import Sidebar from './SideBar'
import DropDownItem from '../components/DropDownItem'

interface LayoutProps {}

const Nav: React.FC<{}> = () => {
  return (
    <>
      <Dropdown name='Tournaments'>
        <DropDownItem to='/name' text='Name'></DropDownItem>
      </Dropdown>
      <Dropdown name='Rules'></Dropdown>
      <Dropdown name='FAQ'></Dropdown>
      <div className='black-link'>
        <Link to='/announcements'>Announcements</Link>
      </div>
    </>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebar] = useState(false)

  return (
    <BrowserRouter>
      {isSidebarOpen ? (
        <Sidebar
          closeSidebar={() => {
            setSidebar(false)
          }}
        >
          <Nav />
        </Sidebar>
      ) : (
        <>
          <Header
            name='AT8'
            isSidebarOpen={isSidebarOpen}
            openSidebar={() => {
              setSidebar(true)
            }}
          >
            <Nav />
          </Header>
          <main>{children}</main>
          <Footer></Footer>
        </>
      )}
    </BrowserRouter>
  )
}

export default Layout
