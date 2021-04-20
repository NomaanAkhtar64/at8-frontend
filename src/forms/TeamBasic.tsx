import React, { useState } from 'react'
import parser from 'html-react-parser'
import FormError from '../components/FormError'
import imgToBase64 from '../utils/imgToBase64'

interface TeamBasicProps {
  game: Game
  site: Site
  onBack?: () => void
  onSuccess: (p: { name: string; logo: string }) => void
  tournament?: Tournament
}

const TeamBasic: React.FC<TeamBasicProps> = ({
  game,
  tournament,
  onBack = null,
  onSuccess,
  site,
}) => {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File>(null)
  const [errors, setErrors] = useState<string[]>([])

  return (
    <div className='register-form'>
      {onBack !== null && (
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
      )}
      <form className='form'>
        <legend>Basic</legend>

        <div className='form-group'>
          <label>Game</label>
          <input
            type='text'
            className='form-control'
            value={game.name}
            readOnly
          />
        </div>
        {tournament && (
          <div className='form-group'>
            <label>Tournament</label>
            <input
              type='text'
              className='form-control'
              value={tournament.name}
              readOnly
            />
          </div>
        )}

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
        <FormError errors={errors} />
        <button
          type='button'
          className='btn btn-success'
          style={{ width: '100%' }}
          onClick={async () => {
            let errs = []
            let isValid = true

            if (name === '') {
              isValid = false
              errs.push('Team Name is Required')
            }

            if (logo === null) {
              isValid = false
              errs.push('Team Logo is Required')
            }

            setErrors(errs)

            if (isValid) {
              const b64Logo = await imgToBase64(logo)
              onSuccess({ name, logo: b64Logo })
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
  )
}

export default TeamBasic
