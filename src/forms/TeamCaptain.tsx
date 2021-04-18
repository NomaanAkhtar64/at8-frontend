import React, { useState } from 'react'
import parser from 'html-react-parser'
import FormError from '../components/FormError'
import * as regex from '../regex'
import PlayerFields from './PlayerFields'

interface TeamCaptainProps {
  onBack: () => void
  onSuccess: (c: { captain: Player; captainTag: string }) => void
  site: Site
  game: Game
}

const TeamCaptain: React.FC<TeamCaptainProps> = ({
  onBack,
  onSuccess,
  site,
  game,
}) => {
  const [errors, setErrors] = useState<string[]>([])
  const [captainTag, setCaptainTag] = useState('')
  const [captain, setCaptain] = useState<Player>({
    url: '',
    username: '',
  })
  return (
    <div className='register-form'>
      <div className='back-btn ml-3'>
        <button
          className='btn btn-warning'
          style={{
            borderTopLeftRadius: '50px',
            borderBottomLeftRadius: '50px',
          }}
          onClick={onBack}
        >
          Back
        </button>
      </div>
      <form className='form'>
        <legend>Team Captain</legend>
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
        <PlayerFields
          game={game}
          player={captain}
          updatePlayer={(p) => setCaptain(p)}
          isAlternate={false}
          number={0}
        />
        <FormError errors={errors} />
        <button
          type='button'
          className='btn btn-success'
          style={{ width: '100%' }}
          onClick={() => {
            let isValid = true
            let errors = []

            if (game.type === 'steam-game') {
              if (captain.url === '') {
                isValid = false
                errors.push('Steam Profile Url Is Required')
              }
              if (captain.url.match(regex.STEAM_PROFILE) == null) {
                isValid = false
                errors.push('Steam Profile Url Is Invalid')
              }
            } else if (game.type === 'pubg') {
              if (captain.username === '') {
                isValid = false
                errors.push('PUBG Username is required')
              }
            } else if (game.type === 'valorant') {
              if (captain.username === '') {
                isValid = false
                errors.push('Valorant Username+tag is required')
              }
            }
            if (captainTag.match(regex.DISCORD_TAG) === null) {
              isValid = false
              errors.push('Discord Username is invalid')
            }
            setErrors(errors)
            if (isValid) {
              onSuccess({ captain, captainTag })
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
  )
}

export default TeamCaptain
