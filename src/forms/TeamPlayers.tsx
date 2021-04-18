import React, { useState } from 'react'
import FormError from '../components/FormError'
import PlayerFields from './PlayerFields'
import parser from 'html-react-parser'

interface TeamPlayersProps {
  onBack: () => void
  onSuccess: (p: Player[]) => void
  site: Site
  game: Game
}

const TeamPlayers: React.FC<TeamPlayersProps> = ({
  onBack,
  onSuccess,
  site,
  game,
}) => {
  const [players, setPlayers] = useState<PI[]>([
    ...Array.from(Array(game.players_in_a_team - 1).keys()).map((number) => ({
      index: number,
      username: '',
      url: '',
      is_alternate: false,
    })),
    ...Array.from(Array(game.alternate_players).keys()).map((number) => ({
      index: number + game.players_in_a_team - 1,
      username: '',
      url: '',
      is_alternate: true,
    })),
  ])

  const [errors, setErrors] = useState<string[]>([])

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
      <form
        className='form'
        onSubmit={async (e) => {
          e.preventDefault()
          let errs = []
          let isValid = true

          setErrors(errs)
          if (isValid) {
            onSuccess(players.map((p) => ({ ...p, index: undefined })))
          }
        }}
      >
        <legend>Players</legend>
        {players
          .sort((a, b) => a['index'] - b['index'])
          .map((p, i) => (
            <PlayerFields
              key={i}
              number={i + 1}
              isAlternate={p.is_alternate}
              player={p}
              game={game}
              updatePlayer={(pl) => {
                setPlayers([
                  ...players.filter((pl) => pl['index'] !== p['index']),
                  pl,
                ])
              }}
            />
          ))}
        <FormError errors={errors} />

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
  )
}

export default TeamPlayers
