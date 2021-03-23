import React, { useState } from 'react'

import MyTeam from './Profile/MyTeam'
import Settings from '../forms/Settings'
import Tournaments from './Profile/Tournaments'
import Loading from '../components/Loading'

import './Profile.scss'
import useProfile from '../hooks/useProfile'

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [teamSelect, setTeamSelect] = useState(true)
  const [tournaSelect, setTournaSelect] = useState(false)
  const [settingSelect, setSettingSelect] = useState(false)

  const profile = useProfile()
  if (profile.hasLoaded) {
    return (
      <>
        <div className='profile-page container my-5'>
          <div className='tab'>
            <ul className='nav nav-tabs' style={{ width: '100%' }}>
              <li className='nav-item'>
                <span
                  className={`nav-link ${teamSelect ? 'active' : 'text-white'}`}
                  aria-current='page'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setTeamSelect(true)
                    setTournaSelect(false)
                    setSettingSelect(false)
                  }}
                >
                  My Team
                </span>
              </li>
              <li className='nav-item'>
                <span
                  className={`nav-link ${
                    tournaSelect ? 'active' : 'text-white'
                  }`}
                  aria-current='page'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setTeamSelect(false)
                    setTournaSelect(true)
                    setSettingSelect(false)
                  }}
                >
                  Tournament History
                </span>
              </li>
              <li className='nav-item'>
                <span
                  className={`nav-link ${
                    settingSelect ? 'active' : 'text-white'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setTeamSelect(false)
                    setTournaSelect(false)
                    setSettingSelect(true)
                  }}
                >
                  Settings
                </span>
              </li>
            </ul>
          </div>
          {teamSelect && <MyTeam />}
          {tournaSelect && <Tournaments />}
          {settingSelect && <Settings />}
        </div>
      </>
    )
  }
  return <Loading />
}

export default Profile
