import React, { useState } from 'react'
import useSite from '../hooks/useSite'
import PlayerFields from './PlayerFields'
import parser from 'html-react-parser'
import imgToBase64 from '../utils/imgToBase64'
import registerTeam from '../hooks/registerTeam'
import useProfile from '../hooks/useProfile'
import '../screens/EnterTournament.scss'
import useGames from '../hooks/useGames'
import Loading from '../components/Loading'
import checkCreateTeam from '../errors/check/checkCreateTeam'
import TeamCaptain from './TeamCaptain'
import TeamBasic from './TeamBasic'
import TeamPlayers from './TeamPlayers'
import FormError from '../components/FormError'

interface CreateTeamProps {
  onCancel: () => void
  onSuccess: (t: Team) => void
}

type Active = 'selector' | 'basic' | 'captain' | 'player'
const CreateTeam: React.FC<CreateTeamProps> = ({ onCancel, onSuccess }) => {
  const [active, setActive] = useState<Active>('selector')
  const site = useSite()
  const games = useGames()
  const [game, setGame] = useState<number>(1)
  const profile = useProfile()
  const [isDisabled, setDisabled] = useState(false)
  const [team, setTeam] = useState<Team>({
    captain: { url: '', username: '', is_alternate: false },
    logo: '',
    name: '',
    players: [],
    team_captains_discord_tag: '',
    user: profile.profile.user,
  })
  const [gameId, setGameId] = useState(0)
  const [selectorError, setSelectorError] = useState<string[]>([])
  if (games.hasLoaded) {
    return (
      <div className='create-team-form' style={{ width: '100%' }}>
        <div className='register'>
          {active === 'selector' && (
            <div className='register-form'>
              <form
                className='form'
                onSubmit={(e) => {
                  e.preventDefault()
                  let isValid = true
                  let errs = []

                  if (gameId === 0 || gameId === null) {
                    isValid = false
                    errs.push('Please select A Game')
                  }

                  setSelectorError(errs)
                  if (isValid) {
                    setActive('basic')
                  }
                }}
              >
                <legend>Select Game</legend>
                <div className='form-group p-2'>
                  <label className='d-block'>Game</label>
                  <select
                    className='form-select w-100 p-2'
                    value={gameId}
                    onChange={(e) => setGameId(parseInt(e.target.value))}
                  >
                    <option value='0'>-----</option>
                    {games.state.map((g, idx) => (
                      <option key={idx} value={g.id + ''}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <FormError errors={selectorError} />
                <button
                  type='submit'
                  className='btn btn-success'
                  style={{ width: '100%' }}
                >
                  Select
                </button>
              </form>
              <div className='hint'>
                <h1>Help text</h1>
                <div>
                  <ol>
                    <li>Choose A Game</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
          {active === 'basic' && (
            <TeamBasic
              game={games.state.find((g) => g.id === gameId)}
              site={site}
              onBack={() => {
                setActive('selector')
              }}
              onSuccess={({ logo, name }) => {
                setTeam({ ...team, logo, name })
                setActive('captain')
              }}
            />
          )}
          {active === 'captain' && (
            <TeamCaptain
              site={site}
              game={games.state.find((g) => g.id === gameId)}
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
              game={games.state.find((g) => g.id === gameId)}
              site={site}
              onBack={() => setActive('captain')}
              onSuccess={async (p: Player[]) => {
                setDisabled(false)
                const createdTeam = await registerTeam(team)
                setDisabled(false)
                if (createdTeam) {
                  onSuccess(createdTeam)
                }
              }}
            />
          )}
        </div>
      </div>
    )
  }
  return <Loading />
}

export default CreateTeam
