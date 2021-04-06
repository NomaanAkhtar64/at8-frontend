import React, { useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router'

import './EnterTournament.scss'
import Payment from '../forms/Payment'
import Register from '../forms/Register'
import Success from '../forms/Success'
import useProfile from '../hooks/useProfile'

const EnterTournament: React.FC<
  RouteComponentProps<{}, {}, TournamentRegister>
> = ({ location }) => {
  const [selectRegister, setSelectRegister] = useState(true)
  const [selectPayment, setSelectPayment] = useState(false)
  const [selectSuccess, setSelectSuccess] = useState(false)
  const [teamId, setTeamId] = useState<number>(null)
  const { game, tournament } = location.state

  const profile = useProfile()
  if (!game || !tournament) {
    return <Redirect to='/'></Redirect>
  }
  return (
    <>
      <div className='register-page mt-5 container'>
        <div className='register-tab' style={{ width: '100%' }}>
          <nav>
            <div
              className='nav nav-tabs'
              id='nav-tab'
              role='tablist'
              style={{ width: '100%' }}
            >
              <button
                className={`nav-link text-white ${selectRegister && 'active'}`}
                id='nav-home-tab'
                data-bs-toggle='tab'
                data-bs-target='#nav-home'
                type='button'
                role='tab'
                aria-controls='nav-home'
                aria-selected='true'
              >
                Register
              </button>
              <button
                className={`nav-link text-white ${selectPayment && 'active'}`}
                id='nav-profile-tab'
                data-bs-toggle='tab'
                data-bs-target='#nav-profile'
                type='button'
                role='tab'
                aria-controls='nav-profile'
                aria-selected='false'
              >
                Payment
              </button>
              <button
                className={`nav-link text-white ${selectSuccess && 'active'} `}
                id='nav-contact-tab'
                data-bs-toggle='tab'
                data-bs-target='#nav-contact'
                type='button'
                role='tab'
                aria-controls='nav-contact'
                aria-selected='false'
              >
                Success
              </button>
            </div>
          </nav>
          {selectRegister && (
            <div
              className='tab-pane fade show'
              id='nav-home'
              role='tabpanel'
              aria-labelledby='nav-home-tab'
            >
              <Register
                profile={profile.profile}
                user={profile.state}
                game={game}
                tournament={tournament}
                toPayment={(id) => {
                  setSelectPayment(true)
                  setSelectRegister(false)
                  setTeamId(id)
                }}
              />
            </div>
          )}
          {selectPayment && (
            <div
              className='tab-pane fade show'
              id='nav-profile'
              role='tabpanel'
              aria-labelledby='nav-profile-tab'
            >
              <Payment
                tournamentId={tournament.id}
                teamId={teamId}
                userId={profile.profile.user}
                toSuccess={() => {
                  setSelectPayment(false)
                  setSelectSuccess(true)
                }}
              />
            </div>
          )}
          {selectSuccess && (
            <div
              className='tab-pane fade show'
              id='nav-contact'
              role='tabpanel'
              aria-labelledby='nav-contact-tab'
            >
              <Success />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default EnterTournament
