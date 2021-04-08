import React from 'react'

interface PlayerFieldsProps {
  number: number
  isAlternate: boolean
  player: Player | PI
  disabled: boolean
  updatePlayer: (p: Player | PI) => void
}

const PlayerFields: React.FC<PlayerFieldsProps> = ({
  number,
  isAlternate,
  player,
  updatePlayer,
  disabled,
}) => {
  return (
    <div className='form-group'>
      <label>
        <strong>
          {isAlternate ? 'Alternate Player' : `Player ${number + 1}`}
        </strong>
      </label>
      <div className='form-group'>
        <label>Username</label>
        <input
          type='text'
          className='form-control'
          placeholder='Username'
          required={number !== 5}
          value={player.username}
          onChange={(e) =>
            updatePlayer({ ...player, username: e.target.value })
          }
          disabled={disabled}
        />
      </div>
      <div className='form-group'>
        <label>Steam Profile Link</label>
        <input
          type='text'
          className='form-control'
          placeholder='Steam Profile Url'
          required={number !== 5}
          value={player.url}
          onChange={(e) => updatePlayer({ ...player, url: e.target.value })}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default PlayerFields
