import React, { useCallback, useMemo, useState } from 'react'
import useTeams from '../../hooks/teams'
import {
  astra,
  brim,
  cypher,
  jett,
  killJoy,
  omen,
  phoenix,
  raze,
  reyna,
  sage,
  skye,
  viper,
} from '../../assets/asset'
import SteamDefault from '../../assets/SteamDefault.png'
import EditTeam from '../../forms/EditTeam'
import CreateTeam from '../../forms/CreateTeam'
import useGames from '../../hooks/games'
import Title from '../../components/Title'
import createRandomRange from '../../utils/createRandomRange'

const valorantImages = [
  killJoy,
  astra,
  brim,
  cypher,
  jett,
  omen,
  phoenix,
  raze,
  reyna,
  sage,
  skye,
  viper,
]

interface MyTeamProps {
  profile: UserProfile
  user: User
}
type Active = 'teams' | 'edit' | 'create'
interface TeamProfileProps {
  user: User
  profile: UserProfile
}
interface TeamBoxProps {
  team: Team
  game: Game
  user: User
  toEdit: (id: number) => void
}
const TeamBox: React.FC<TeamBoxProps> = ({ game, team, toEdit, user }) => {
  const range = useMemo(
    () => createRandomRange(0, valorantImages.length - 1, team.players.length),
    [team]
  )

  const getImage = useCallback(
    (player, index) => {
      if (player.steam_profile) return player.steam_profile
      if (game.type.name === 'valorantUsername') {
        console.log(index)
        return valorantImages[range[index]]
      }
      return SteamDefault
    },
    [game, range]
  )
  return (
    <div className={'team-data mt-5'}>
      <div className='team-name'>
        <h4>{team.name}</h4>
        <img src={team.logo} width='100%' alt='Team-Logo' />
        <p color='white'>{team.registration_date}</p>
      </div>
      <div className='team-players'>
        <a
          href={team.captain.url === '' ? '#' : team.captain.url}
          target={team.captain.url !== '' && '_blank'}
          rel='noreferrer'
        >
          <div className='player'>
            <h4>
              {team.captain.steam_username
                ? team.captain.steam_username
                : team.captain.username.replace(/#\d+/, '')}
            </h4>
            <img
              src={getImage(team.captain, 0)}
              className='captain-image'
              alt='Default'
            />
            <p color='white'>Captain</p>
          </div>
        </a>

        {team.players.map(
          (player, i) =>
            (player.username || player.url) && (
              <a
                key={i}
                href={player.url === '' ? '#' : player.url}
                target={player.url !== '' && '_blank'}
                rel='noreferrer'
              >
                <div className='player'>
                  <h4>
                    {player.steam_username
                      ? player.steam_username
                      : player.username.replace(/#\d+/, '')}
                  </h4>
                  <img
                    src={getImage(player, i + 1)}
                    alt='Default'
                    className={player.username === user.username ? 'me' : ''}
                  />
                  <p color='white'>
                    {player.is_alternate ? 'Alternate' : 'Player'}
                  </p>
                </div>
              </a>
            )
        )}
        <div className='game-name-team'>{game.name}</div>
        <div className='edit-team-btn'>
          <div className='team-action-text' onClick={() => toEdit(team.id)}>
            Edit
          </div>
        </div>
      </div>
    </div>
  )
}

const TeamProfile: React.FC<TeamProfileProps> = ({ user, profile }) => {
  const [active, setActive] = useState<Active>('teams')
  const [teamToEdit, setTeamToEdit] = useState<number>(null)

  const teams = useTeams()
  const games = useGames()

  switch (active) {
    case 'teams':
      return (
        <div className='team'>
          <Title>My Teams - AT8</Title>
          {teams.state
            .sort((a, b) => a.id - b.id)
            .map((team, i) => (
              <TeamBox
                key={i}
                user={user}
                toEdit={(idx) => {
                  setActive('edit')
                  setTeamToEdit(idx)
                }}
                team={team}
                game={games.find((g) => g.id === team.game)}
              />
            ))}
          {(teams.state.length === 0 || !teams) && (
            <div className='no-team'>No Teams Found</div>
          )}
          <div className='create-team-btn text-center my-3'>
            <button
              type='button'
              className='btn btn-success btn-lg'
              onClick={() => setActive('create')}
            >
              Create your Team
            </button>
          </div>
        </div>
      )
    case 'create':
      return (
        <CreateTeam
          onCancel={() => setActive('teams')}
          onSuccess={() => {
            setActive('teams')
          }}
        />
      )
    case 'edit':
      return (
        <EditTeam
          onSucess={() => {
            setActive('teams')
          }}
          onCancel={() => setActive('teams')}
          userId={profile.user}
          teamId={teamToEdit}
        />
      )
  }
}
const MyTeam: React.FC<MyTeamProps> = ({ profile, user }) => {
  return <TeamProfile user={user} profile={profile} />
}

export default MyTeam
