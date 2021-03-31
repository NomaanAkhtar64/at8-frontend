import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import registerTeam from '../hooks/registerTeam'
import useProfile from '../hooks/useProfile'
import useSite from '../hooks/useSite'
import parser from 'html-react-parser'
import PlayerFields from './PlayerFields'

interface RegisterProps {
  toPayment: (i: number) => void
  game: number
}

type Active = 'basic' | 'captain' | 'player'
const Register: React.FC<RegisterProps> = ({ toPayment, game }) => {
  const [active, setActive] = useState<Active>('basic')
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File>(null)
  const [captain, setCaptain] = useState('')
  const [captainTag, setCaptainTag] = useState('')
  const [captainProfile, setCaptainProfile] = useState('')
  const site = useSite()
  const [players, setPlayers] = useState([
    {
      idx: 1,
      username: '',
      url: '',
    },
    {
      idx: 2,
      username: '',
      url: '',
    },
    {
      idx: 3,
      username: '',
      url: '',
    },
    {
      idx: 4,
      username: '',
      url: '',
    },
    {
      idx: 5,
      username: '',
      url: '',
    },
  ])

  const profile = useProfile()

  return (
    <>
      <div>
        <div className='register'>
          {active === 'basic' && (
            <div className='register-form'>
              <form className='form'>
                <legend>Basic</legend>
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
                          console.log(e.target.files[0])
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
            <div className='register-form'>
              <form className='form'>
                <legend>Team Captain</legend>
                <div className='form-group'>
                  <label>Team Captain</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Username'
                    value={captain}
                    onChange={(e) => setCaptain(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Discord username + Tag</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='name#1234'
                    value={captainTag}
                    onChange={(e) => setCaptainTag(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Steam Profile link</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Place URL'
                    value={captainProfile}
                    onChange={(e) => setCaptainProfile(e.target.value)}
                    required
                  />
                </div>

                <button
                  type='button'
                  className='btn btn-success'
                  style={{ width: '100%' }}
                  onClick={() => {
                    if (
                      (captain !== '' &&
                        captainTag.match(/([a-zA-Z0-9!@#$%-_])+[#]\d{4}/gm) !==
                          null &&
                        captainProfile.match(
                          /(https:)([/])+([/])+(steamcommunity)+([.])(com)+([/])+(profiles)+([/])+\d([0-9])+([/])/gm
                        ) !== null) ||
                      captainProfile.match(
                        /(https:)([/])+([/])+(steamcommunity)+([.])(com)+([/])+(id)+([/])/gm
                      ) !== null
                    ) {
                      setActive('player')
                    }
                  }}
                >
                  Enter
                </button>
              </form>

              <div className='hint'>
                <h1>Help text</h1>
                <div>{parser(site.help_team_captain)}</div>
              </div>
            </div>
          )}

          {active === 'player' && (
            <div className='register-form'>
              <form
                className='form'
                onSubmit={(e) => {
                  e.preventDefault();
                  registerTeam(
                    profile.profile.user,
                    name,
                    logo,
                    {
                      username: captain,
                      url: captainProfile,
                    },
                    captainTag,
                    game,
                    players
                  ).then((id) => {
                    if (typeof id === 'number') {
                      toPayment(id)
                    }
                  })
                  console.log(players)
                }}
              >
                <legend>Players</legend>
                {[...Array(5).keys()].map((i) => (
                  <PlayerFields
                    key={i}
                    number={i + 1}
                    players={players}
                    setPlayers={setPlayers}
                  />
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
        </div>
      </div>
    </>
  )
}

export default Register
