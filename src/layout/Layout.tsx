import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import Dropdown from '../components/Dropdown'
import './Layout.scss'
import Sidebar from './SideBar'
import DropDownItem from '../components/DropDownItem'
import { SiteProvider } from '../hooks/useSite'
import { TeamsProvider } from '../hooks/teams'
import useGames, { GamesProvider } from '../hooks/games'
import { TournamentProvider } from '../hooks/tournaments'

interface LayoutProps {}

const Nav: React.FC<{}> = () => {
  const games = useGames()
  return (
    <>
      <Dropdown name='Tournaments'>
        {games.map((game, i) => (
          <DropDownItem
            key={i}
            to={`/tournament/${game.slug}`}
            text={game.name}
          />
        ))}
      </Dropdown>
      <div className='black-link'>
        <Link to='/faq'>FAQ</Link>
      </div>
      <div className='black-link'>
        <Link to='/announcements'>Announcements</Link>
      </div>
    </>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebar] = useState(false)

  if (isSidebarOpen)
    return (
      <Sidebar
        closeSidebar={() => {
          setSidebar(false)
        }}
      >
        <Nav />
      </Sidebar>
    )

  return (
    <GamesProvider>
      <Header
        isSidebarOpen={isSidebarOpen}
        openSidebar={() => {
          setSidebar(true)
        }}
      >
        <Nav />
      </Header>
      <main>
        <TournamentProvider>
          <TeamsProvider>
            <SiteProvider>{children}</SiteProvider>
          </TeamsProvider>
        </TournamentProvider>
      </main>
      <Footer></Footer>
    </GamesProvider>
  )
}

export default Layout
