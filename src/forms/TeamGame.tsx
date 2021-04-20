import React, { useState } from 'react'
import FormError from '../components/FormError'
interface TeamGameProps {
  onSuccess: (p: { gameId: number }) => void
  games: Game[]
}

const TeamGame: React.FC<TeamGameProps> = ({ onSuccess, games }) => {
  const [gameId, setGameId] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  return (
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

          setErrors(errs)
          if (isValid) {
            onSuccess({ gameId })
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
            {games.map((g, idx) => (
              <option key={idx} value={g.id + ''}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <FormError errors={errors} />
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
  )
}

export default TeamGame
