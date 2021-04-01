import React, { useState } from 'react'

import MyTeam from './Profile/MyTeam'
import Settings from './Profile/Settings'
import Tournaments from './Profile/Tournaments'
import Loading from '../components/Loading'

import './Profile.scss'
import useProfile from '../hooks/useProfile'
import useEntries from '../hooks/useEntries'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

const Profile: React.FC<RouteComponentProps> = ({ location }) => {
  const entries = useEntries()
  const profile = useProfile()
  const { pathname } = location
  if (entries.hasLoaded) {
    return (
      <>
        <div className='profile-page container my-5'>
          <div className='tab'>
            <ul className='nav nav-tabs' style={{ width: '100%' }}>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    pathname === '/profile/teams' ? 'active' : 'text-white'
                  }`}
                  aria-current='page'
                  style={{ cursor: 'pointer' }}
                  to='/profile/teams'
                >
                  My Team
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    pathname === '/profile/entries' ? 'active' : 'text-white'
                  }`}
                  aria-current='page'
                  style={{ cursor: 'pointer' }}
                  to='/profile/entries'
                >
                  Tournament Entries
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/profile/settings'
                  className={`nav-link ${
                    pathname === '/profile/settings' ? 'active' : 'text-white'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          {pathname === '/profile/teams' && (
            <MyTeam profile={profile.profile} user={profile.state} />
          )}
          {pathname === '/profile/entries' && (
            <Tournaments entries={entries.state} />
          )}
          {pathname === '/profile/settings' && <Settings />}
        </div>
      </>
    )
  }
  return <Loading />
}

export default Profile
