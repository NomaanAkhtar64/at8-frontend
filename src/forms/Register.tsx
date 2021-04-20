import React, { useEffect, useState } from 'react'
import useSite from '../hooks/useSite'
import parser from 'html-react-parser'
import useTeams from '../hooks/teams'
import Loading from '../components/Loading'
import Field from '../components/Field'
import useGames from '../hooks/useGames'
import TeamCaptain from './TeamCaptain'
import TeamPlayers from './TeamPlayers'
import TeamBasic from './TeamBasic'

interface RegisterProps {
  toPayment: (i: number) => void
  tournament: Tournament
  profile: UserProfile
}

type Active = 'basic' | 'captain' | 'player' | 'tourna' | 'selector'
const Register: React.FC<RegisterProps> = ({
  toPayment,
  tournament,
  profile,
}) => {
  const [active, setActive] = useState<Active>('selector')
  const [team, setTeam] = useState<Team>({
    captain: { url: '', username: '', is_alternate: false },
    logo: '',
    name: '',
    players: [],
    team_captains_discord_tag: '',
    user: profile.user,
    game: tournament.game.id,
  })
  const [teamSelect, setTeamSelect] = useState<number>(null)
  const site = useSite()
  const games = useGames()
  const [isDisabled, setDisabled] = useState(false)

  const teams = useTeams()

  useEffect(() => {
    document.title = 'Register Team - AT8'
    if (teams.state.length > 0) {
      if (teams.state[0].id) {
        setTeamSelect(teams.state[0].id)
      }
    }
  }, [teams])
  const game = tournament.game
  if (games.hasLoaded) {
    return (
      <div>
        <div className='register'>
          {active === 'selector' && (
            <div className='register-team-btns'>
              <div className='register-option-heading'>
                <h2>Select how you want to register your team</h2>
              </div>
              <div className='register-options-btns'>
                <button
                  type='button'
                  className='btn btn-success'
                  style={{ width: '100%' }}
                  onClick={() => setActive('tourna')}
                >
                  Select Existing
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  style={{ width: '100%' }}
                  onClick={() => setActive('basic')}
                >
                  Create New Team
                </button>
              </div>
            </div>
          )}

          {active === 'basic' && (
            <TeamBasic
              game={game}
              tournament={tournament}
              site={site}
              onBack={() => setActive('selector')}
              onSuccess={({ logo, name }) => {
                setTeam({ ...team, logo, name })
                setActive('captain')
              }}
            />
          )}
          {active === 'captain' && (
            <TeamCaptain
              site={site}
              game={game}
              onBack={() => setActive('basic')}
              onSuccess={({ captain, captainTag }) => {
                setTeam({
                  ...team,
                  captain,
                  team_captains_discord_tag: captainTag,
                })
                setActive('player')
              }}
            />
          )}
          {active === 'player' && (
            <TeamPlayers
              disabled={isDisabled}
              game={game}
              site={site}
              onBack={() => setActive('captain')}
              onSuccess={async (p: Player[]) => {
                setDisabled(true)
                const t = await teams.action.create(team)
                setDisabled(false)
                if (t) {
                  toPayment(t.id)
                }
              }}
            />
          )}
          {active === 'tourna' && (
            <div className='register-form'>
              <div className='back-btn my-3'>
                <button
                  className='btn btn-warning'
                  style={{
                    borderTopLeftRadius: '50px',
                    borderBottomLeftRadius: '50px',
                  }}
                  onClick={() => setActive('selector')}
                >
                  Back
                </button>
              </div>
              <form
                className='form'
                onSubmit={(e) => {
                  e.preventDefault()
                  toPayment(teamSelect)
                }}
              >
                <Field
                  name='game'
                  type='text'
                  value={tournament.game.name}
                  readOnly
                />
                <Field
                  name='tournament'
                  type='text'
                  value={tournament.name}
                  readOnly
                />
                <div className='form-group'>
                  <label>Select your team if already registered</label>
                  <select
                    className='form-control team-select'
                    aria-label='Default select example'
                    onChange={(e) => {
                      setTeamSelect(parseInt(e.target.value))
                    }}
                    value={teamSelect}
                    required
                  >
                    {teams.state.map((team, i) => (
                      <option key={i} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type='submit'
                  className='btn btn-success btn-lg'
                  style={{ width: '100%' }}
                >
                  Register
                </button>
              </form>
              <div className='hint'>
                <h1>Help Text</h1>
                <div>{parser(site.help_team_existing)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  return <Loading />
}

export default Register
