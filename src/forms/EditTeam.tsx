import React, { useState } from 'react'

import Loading from '../components/Loading'
import editTeamRegister from '../hooks/editTeamRegister'
import useGames from '../hooks/games'
import useTeams from '../hooks/teams'
import imgToBase64 from '../utils/imgToBase64'
import PlayerFields from './PlayerFields'

interface EditTeamProps {
  userId: number
  teamId: number
  onCancel: () => void
  onSucess: () => void
}
interface FormProps {
  team: Team
  onCancel: () => void
  onSucess: () => void
}
const Form: React.FC<FormProps> = ({ team, onCancel, onSucess }) => {
  const [name, setName] = useState<string>(team.name)
  const [logo, setLogo] = useState<File>(null)
  const [logoURL, setLogoURL] = useState(null)
  const games = useGames()
  const game = games.find((g) => g.id === team.game)
  const [captainTag, setCaptainTag] = useState<string>(
    team.team_captains_discord_tag
  )
  const [captain, setCaptain] = useState<Player>({
    url: game.type.type === 'url' ? team.captain.url : '',
    username: game.type.type !== 'url' ? team.captain.username : '',
    email: "",
    is_alternate: false,
    location: '',
  })
  const [players, setPlayers] = useState<PI[]>(
    team.players.map((t, i) => ({ ...t, index: i }))
  )
  const { action: teamActions } = useTeams()
  const [isDisabled, setDisabled] = useState(false)
  // const [country, setCountry] = useState("");
  // const [city, setCity] = useState("");
  // useEffect(() => {
  //   axios
  //     .get("https://extreme-ip-lookup.com/json/")
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [])
  return (
    <form
      className='edit-form'
      onSubmit={async (e) => {
        e.preventDefault()
        setDisabled(true)
        let imgBase64: string
        if (logo) {
          imgBase64 = await imgToBase64(logo)
        } else {
          imgBase64 = undefined
        }
        const editedTeam = await editTeamRegister({
          id: team.id,
          name: name,
          logo: imgBase64,
          captain,
          team_captains_discord_tag: captainTag,
          players,
        })
        setDisabled(false)
        if (editedTeam) {
          onSucess()
        }
      }}
    >
      <div className='profile-data' style={{ flexDirection: 'column' }}>
        <div className='back-btn edit px-3'>
          <button
            type='button'
            className='btn btn-warning'
            style={{
              borderTopLeftRadius: '50px',
              borderBottomLeftRadius: '50px',
            }}
            onClick={onCancel}
          >
            Back
          </button>
          <button
            type='button'
            className='btn btn-delete'
            style={{ marginLeft: 'auto' }}
            onClick={async () => {
              setDisabled(true)
              await teamActions.delete(team.id)
              setDisabled(false)
              onCancel()
            }}
          >
            DELETE
          </button>
        </div>
        <div className='main-team-section'>
          <div className='edit-team-section'>
            <legend>EDIT TEAM</legend>
            <div className='form-group'>
              <label>Team Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Name your team'
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div className='profile-pic-container'>
              <img
                src={logoURL ? logoURL.logoURL : team.logo}
                alt=''
                width='100%'
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
                    disabled={isDisabled}
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setLogo(e.target.files[0])
                        setLogoURL({
                          logoURL: URL.createObjectURL(e.target.files[0]),
                        })
                      } else {
                        setLogo(null)
                        setLogoURL({
                          logoURL: null,
                        })
                      }
                    }}
                  />
                  <label className='custom-file-label'>
                    {logo ? <p>{logo.name}</p> : 'Choose file'}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='edit-team-section'>
            <legend>Team Captain</legend>
            <div className='form-group'>
              <label>Discord username + Tag</label>
              <input
                type='text'
                className='form-control'
                placeholder='name#1234'
                value={captainTag}
                disabled={isDisabled}
                onChange={(e) => setCaptainTag(e.target.value)}
                required
              />
            </div>
            <PlayerFields
              game={games.find((g) => g.id === team.game)}
              player={captain}
              updatePlayer={(p) => setCaptain(p)}
              isAlternate={captain.is_alternate}
              number={0}
              disabled={isDisabled}
            />
          </div>
          <div className='edit-team-section'>
            <legend>Players</legend>
            {players
              .sort((a, b) => a.index - b.index)
              .map((pl) => (
                <PlayerFields
                  key={pl.index}
                  number={pl.index + 1}
                  isAlternate={pl.is_alternate}
                  player={pl}
                  disabled={isDisabled}
                  game={games.find((g) => g.id === team.game)}
                  updatePlayer={(p) => {
                    setPlayers([
                      ...players.filter((p) => p.index !== pl.index),
                      p,
                    ])
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      <div className='edit-team-btns'>
        <button disabled={isDisabled} type='submit' className='btn btn-success'>
          Save
        </button>
        <button
          disabled={isDisabled}
          onClick={onCancel}
          type='button'
          className='btn btn-danger'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const EditTeam: React.FC<EditTeamProps> = ({ teamId, onCancel, onSucess }) => {
  const teams = useTeams()
  const team = teams.state.find((t) => t.id === teamId)

  if (team) return <Form onSucess={onSucess} onCancel={onCancel} team={team} />
  return <Loading />
}

export default EditTeam
