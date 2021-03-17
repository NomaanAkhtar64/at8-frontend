import React from 'react'
import Footer from './Footer'
import Header from './Header'
import SideBarProvider from './SideBarProvider'
import './Layout.scss'
import { NavLink } from 'react-router-dom'

interface LayoutProps {}

const Nav: React.FC<{}> = () => {
  return (
    <nav>
      <NavLink activeClassName='active' to='/   '></NavLink>
    </nav>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SideBarProvider>
        <Header name='AT8' logo='logopath'></Header>
        <Footer></Footer>
      </SideBarProvider>
    </>
  )
}

export default Layout
