import React, { useEffect, useState } from 'react'
import useTeams from '../../hooks/useTeams'

import SteamDefault from '../../assets/SteamDefault.png'
import Loading from '../../components/Loading'
import { useHistory } from 'react-router'
import EditTeam from '../../forms/EditTeam'

interface MyTeamProps {
  profile: UserProfile
  user: User
}
type Active = 'teams' | 'edit' | 'create'
const MyTeam: React.FC<MyTeamProps> = ({ profile, user }) => {
  const [active, setActive] = useState<Active>('teams')
  const teams = useTeams(profile.user)
  const [teamToEdit, setTeamToEdit] = useState<number>(null)
  const history = useHistory()
  if (teams.hasLoaded) {
    switch (active) {
      case 'teams':
        return (
          <div className='team'>
            {teams.state.map((team, i) => (
              <div key={i} className={i > 0 ? 'team-data mt-5' : 'team-data'}>
                <div className='team-name'>
                  <h4>{team.name}</h4>
                  <img src={team.logo} width='100%' alt='Team-Logo' />
                  <p color='white'>{team.registration_date}</p>
                </div>
                <div className='team-players'>
                  <a href={team.captain.url} target='_blank' rel='noreferrer'>
                    <div className='player'>
                      <h4>{team.captain.username}</h4>
                      <img
                        src={
                          team.captain.profile
                            ? team.captain.profile
                            : SteamDefault
                        }
                        className='captain-image'
                        alt='Default'
                      />
                      <p color='white'>Captain</p>
                    </div>
                  </a>

                  {team.players.map((player, i) => (
                    <a
                      key={i}
                      href={player.url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div className='player'>
                        <h4>{player.username}</h4>
                        <img
                          src={player.profile ? player.profile : SteamDefault}
                          alt='Default'
                          className={
                            player.username === user.username ? 'me' : ''
                          }
                        />
                        <p color='white'>Player</p>
                      </div>
                    </a>
                  ))}
                  <div className='edit-team-btn'>
                    <div
                      className='team-action-text'
                      onClick={() => {
                        setTeamToEdit(team.id)
                        setActive('edit')
                        // history.push(`/register/team/edit/${team.id}`)
                      }}
                    >
                      Edit
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* {createTeam ? ( */}
            <div className='create-team'></div>) : (
            <div className='create-team-btn text-center my-3'>
              <button
                type='button'
                className='btn btn-success btn-lg'
                onClick={() => setActive('create')}
              >
                Create your Team
              </button>
            </div>
            {/* )} */}
            {(teams.state.length === 0 || !teams.state) && (
              <div className='no-team'>No Teams Found</div>
            )}
          </div>
        )
      case 'create':
        return <div className='create'>CREATE FORM</div>
      case 'edit':
        return <EditTeam userId={profile.user} teamId={teamToEdit} />
    }
  }
  return <Loading />
}

export default MyTeam
