import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'

import './EnterTournament.scss'
import Payment from '../forms/Payment'
import Register from '../forms/Register'
import Success from '../forms/Success'
import useProfile from '../hooks/useProfile'
import useTournaments from '../hooks/useTournaments'
import Loading from '../components/Loading'

type Active = 'register' | 'payment' | 'success'
const EnterTournament: React.FC<
  RouteComponentProps<{ tournamentSlug: string }>
> = ({ match }) => {
  const [active, setActive] = useState<Active>('register')
  const [teamId, setTeamId] = useState<number>(null)

  const profile = useProfile()
  const tournament = useTournaments(match.params.tournamentSlug)

  if (tournament.hasLoaded) {
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
                  className={`nav-link text-white ${
                    active === 'register' && 'active'
                  }`}
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
                  className={`nav-link text-white ${
                    active === 'payment' && 'active'
                  }`}
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
                  className={`nav-link text-white ${
                    active === 'success' && 'active'
                  } `}
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
            {active === 'register' && (
              <div
                className='tab-pane fade show'
                id='nav-home'
                role='tabpanel'
                aria-labelledby='nav-home-tab'
              >
                <Register
                  profile={profile.profile}
                  tournament={tournament.state[0]}
                  toPayment={(id) => {
                    setActive('payment')
                    setTeamId(id)
                  }}
                />
              </div>
            )}
            {active === 'payment' && (
              <div
                className='tab-pane fade show'
                id='nav-profile'
                role='tabpanel'
                aria-labelledby='nav-profile-tab'
              >
                <Payment
                  teamId={teamId}
                  userId={profile.profile.user}
                  tournament={tournament.state[0]}
                  toSuccess={() => {
                    setActive('success')
                  }}
                />
              </div>
            )}
            {active === 'success' && (
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
  return <Loading />
}

export default EnterTournament
