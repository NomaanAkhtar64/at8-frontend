import React, { useEffect, useState } from 'react'
import registerTeam from '../hooks/registerTeam'
import useSite from '../hooks/useSite'
import parser from 'html-react-parser'
import PlayerFields from './PlayerFields'
import imgToBase64 from '../utils/imgToBase64'
import useTeams from '../hooks/useTeams'
import Loading from '../components/Loading'
import Field from '../components/Field'
import useGames from '../hooks/useGames'
import TeamCaptain from './TeamCaptain'

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
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File>(null)
  const [captain, setCaptain] = useState<Player>({
    url: '',
    username: '',
  })
  const [captainTag, setCaptainTag] = useState('')
  const [teamSelect, setTeamSelect] = useState<number>(null)
  const site = useSite()
  const games = useGames()
  const [players, setPlayers] = useState<PI[]>([
    {
      index: 0,
      username: '',
      url: '',
    },
    {
      index: 1,
      username: '',
      url: '',
    },
    {
      index: 2,
      username: '',
      url: '',
    },
    {
      index: 3,
      username: '',
      url: '',
    },
    {
      index: 4,
      username: '',
      url: '',
    },
  ])

  const teams = useTeams(profile.user)

  useEffect(() => {
    document.title = 'Register Team - AT8'
    if (teams.state.length > 0) {
      if (teams.state[0].id) {
        setTeamSelect(teams.state[0].id)
      }
    }
  }, [teams])
  const game = tournament.game
  if (teams.hasLoaded && games.hasLoaded) {
    return (
      <>
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
              <div className='register-form'>
                <div className='back-btn ml-3'>
                  <button
                    className='btn btn-warning'
                    style={{
                      borderTopLeftRadius: '50px',
                      borderBottomLeftRadius: '50px',
                    }}
                    onClick={() => {
                      setActive('selector')
                    }}
                  >
                    Back
                  </button>
                </div>
                <form className='form'>
                  <legend>Basic</legend>

                  <div className='form-group'>
                    <label>Game</label>
                    <input
                      type='text'
                      className='form-control'
                      value={tournament.game.name}
                      readOnly
                    />
                  </div>
                  <div className='form-group'>
                    <label>Tournament</label>
                    <input
                      type='text'
                      className='form-control'
                      value={tournament.name}
                      readOnly
                    />
                  </div>

                  <div className='form-group'>
                    <label>Team Name</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Name your team'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label>Upload team logo</label>
                    <div className='input-group mb-3'>
                      <div className='custom-file'>
                        <input
                          type='file'
                          accept='image/*'
                          className='custom-file-input'
                          id='inputGroupFile02'
                          required
                          onChange={(e) => {
                            setLogo(e.target.files[0])
                          }}
                        />
                        <label className='custom-file-label'>
                          {logo ? <p>{logo.name}</p> : 'Choose file'}
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type='button'
                    className='btn btn-success'
                    style={{ width: '100%' }}
                    onClick={() => {
                      if (name !== '' && logo['name']) {
                        setActive('captain')
                      }
                    }}
                  >
                    Enter
                  </button>
                </form>
                <div className='hint'>
                  <h1>Help text</h1>
                  <div>{parser(site.help_team_basic)}</div>
                </div>
              </div>
            )}
            {active === 'captain' && (
              <TeamCaptain
                site={site}
                game={game}
                onBack={() => setActive('basic')}
                onSuccess={({ captain, captainTag }) => {
                  setActive('player')
                  setCaptain(captain)
                  setCaptainTag(captainTag)
                }}
              />
              // <div className='register-form'>
              //   <div className='back-btn ml-3'>
              //     <button
              //       className='btn btn-warning'
              //       style={{
              //         borderTopLeftRadius: '50px',
              //         borderBottomLeftRadius: '50px',
              //       }}
              //       onClick={() => {
              //         setActive('basic')
              //       }}
              //     >
              //       Back
              //     </button>
              //   </div>
              //   <form className='form'>
              //     <legend>Team Captain</legend>
              //     <div className='form-group'>
              //       <label>Discord username + Tag</label>
              //       <input
              //         type='text'
              //         className='form-control'
              //         placeholder='name#1234'
              //         value={captainTag}
              //         onChange={(e) => setCaptainTag(e.target.value)}
              //         required
              //       />
              //     </div>
              //     <PlayerFields
              //       game={game}
              //       player={captain}
              //       updatePlayer={(p) => setCaptain(p)}
              //       isAlternate={false}
              //       number={1}
              //     />
              //     <FormError errors={captainError} />
              //     <button
              //       type='button'
              //       className='btn btn-success'
              //       style={{ width: '100%' }}
              //       onClick={() => {
              //         let isValid = true
              //         let errors = []

              //         if (game.type === 'steam-url') {
              //           if (captain.url === '') {
              //             isValid = false
              //             errors.push('Steam Profile Url Is Required')
              //           }
              //           if (captain.url.match(regex.STEAM_PROFILE) == null) {
              //             isValid = false
              //             errors.push('Steam Profile Url Is Invalid')
              //           }
              //         } else if (game.type === 'pubg') {
              //           if (captain.username === '') {
              //             isValid = false
              //             errors.push('PUBG Username is required')
              //           }
              //         } else if (game.type === 'valorant') {
              //           if (captain.username === '') {
              //             isValid = false
              //             errors.push('Valorant Username+tag is required')
              //           }
              //         }
              //         if (captainTag.match(regex.DISCORD_TAG) === null) {
              //           isValid = false
              //           errors.push('Discord Username is invalid')
              //         }
              //         setCaptainError(errors)
              //         if (isValid) {
              //           setActive('player')
              //         }
              //       }}
              //     >
              //       Enter
              //     </button>
              //   </form>

              //   <div className='hint'>
              //     <h1>Help text</h1>
              //     <div>{parser(site.help_team_captain)}</div>
              //   </div>
              // </div>
            )}

            {active === 'player' && (
              <div className='register-form'>
                <div className='back-btn ml-3'>
                  <button
                    className='btn btn-warning'
                    style={{
                      borderTopLeftRadius: '50px',
                      borderBottomLeftRadius: '50px',
                    }}
                    onClick={() => {
                      setActive('captain')
                    }}
                  >
                    Back
                  </button>
                </div>
                <form
                  className='form'
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const imgBase64 = await imgToBase64(logo)
                    const t = await registerTeam(
                      profile.user,
                      name,
                      imgBase64,
                      captain,
                      captainTag,
                      tournament.game.id,
                      players
                    )
                    if (t) {
                      toPayment(t.id)
                    }
                  }}
                >
                  <legend>Players</legend>
                  {players
                    .sort((a, b) => a['index'] - b['index'])
                    .map((p, i) => (
                      <>
                        <PlayerFields
                          key={i}
                          number={i + 1}
                          isAlternate={i === 4}
                          player={p}
                          game={game}
                          updatePlayer={(pl) => {
                            setPlayers([
                              ...players.filter(
                                (pl) => pl['index'] !== p['index']
                              ),
                              pl,
                            ])
                          }}
                        />
                      </>
                    ))}
                  <button
                    type='submit'
                    className='btn btn-success'
                    style={{ width: '100%' }}
                  >
                    Submit
                  </button>
                </form>
                <div className='hint'>
                  <h1>Help Text</h1>
                  <div>{parser(site.help_team_players)}</div>
                </div>
              </div>
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
      </>
    )
  }
  return <Loading />
}

export default Register
