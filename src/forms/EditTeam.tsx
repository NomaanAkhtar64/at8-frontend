import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import Loading from '../components/Loading'
import useProfile from '../hooks/useProfile'
import useTeam from '../hooks/useTeam'
import PlayerFields from './PlayerFields'

interface EditTeamProps {
  userId: number
  teamId: number
}
interface FormProps {
  team: Teams
}
const Form: React.FC<FormProps> = (props) => {
  const t = props.team
  console.log(t)
  const [name, setName] = useState<string>(t.name)
  const [logo, setLogo] = useState<File>(null)
  const [logoURL, setLogoURL] = useState<string>(t.logo)
  const [captain, setCaptain] = useState<string>(t.captain.username)
  const [captainTag, setCaptainTag] = useState<string>(
    t.team_captains_discord_tag
  )
  const [captainProfile, setCaptainProfile] = useState<string>(t.captain.url)
  const [players, setPlayers] = useState<Player[]>(t.players)
  const [isDisabled, setDisabled] = useState(false)

  return (
    <form className='edit-form'>
      <div className='profile-data'>
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
        </div>
        <div className='edit-team-section'>
          <legend>Team Captain</legend>
          <div className='form-group'>
            <label>Username</label>
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
        </div>
        <div className='edit-team-section'>
          <legend>Players</legend>
          {players.map((pl, i) => (
            <PlayerFields
              key={i}
              number={i + 1}
              isAlternate={i === 4}
              player={pl}
              disabled={isDisabled}
              updatePlayer={(p) => {
                setPlayers([...players.filter((pl, indx) => indx !== i), p])
              }}
            />
          ))}
        </div>
      </div>
    </form>
  )
}

const EditTeam: React.FC<EditTeamProps> = ({ userId, teamId }) => {
  const teams = useTeam(userId, teamId)
  if (teams.hasLoaded) {
    return <Form team={teams.state} />
  }
  return <Loading />
}

export default EditTeam
