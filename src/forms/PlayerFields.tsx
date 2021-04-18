import React from 'react'
import Field from '../components/Field'

interface PlayerFieldsProps {
  number: number
  isAlternate: boolean
  player: PI
  disabled?: boolean
  game: Game
  updatePlayer: (p: PI) => void
}

const PlayerFields: React.FC<PlayerFieldsProps> = ({
  number,
  isAlternate,
  player,
  updatePlayer,
  game,
  disabled = false,
}) => {
  return (
    <div>
      {number !== 0 && (
        <label>
          <strong>
            {isAlternate ? 'Alternate Player' : `Player ${number + 1}`}
          </strong>
        </label>
      )}

      {game.type === 'steam-game' && (
        <Field
          type='url'
          name='steamProfileLink'
          placeholderText='https://steamcommunity.com/id/example-account/'
          value={player.url}
          onChange={(v: string, e) => {
            updatePlayer({ ...player, url: v })
          }}
          disable={disabled}
        />
      )}
      {game.type === 'valorant' && (
        <Field
          type='text'
          name='valorantUsername'
          value={player.username}
          placeholderText='example#6752'
          onChange={(v: string, e) => {
            updatePlayer({
              ...player,
              username: v.length > 18 ? v.substr(0, 18) : v,
            })
          }}
          disable={disabled}
        />
      )}
      {game.type === 'pubg' && (
        <Field
          type='text'
          name='pubgUsername'
          value={player.username}
          onChange={(v: string, e) => {
            updatePlayer({
              ...player,
              username: v.length > 18 ? v.substr(0, 18) : v,
            })
          }}
          disable={disabled}
        />
      )}
    </div>
  )
}

export default PlayerFields
