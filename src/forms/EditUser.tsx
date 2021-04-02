import React, { useState } from 'react'
import checkEditUserData from '../errors/check/checkEditUserData'
import checkEditUserProfileData from '../errors/check/checkEditUserProfileData'
import editProfile from '../hooks/editProfile'
import editUser from '../hooks/editUser'
import useProfile from '../hooks/useProfile'

interface EditUserProps {
  user: User
  profile: UserProfile
}

const EditUser: React.FC<EditUserProps> = ({ user, profile }) => {
  const [username, setUsername] = useState(user.username)
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [steamUrl, setSteamUrl] = useState(profile.steam_profile)
  const [discordTag, setDiscordTag] = useState(profile.discord_name_tag)
  const [error, setError] = useState('')
  const profileUser = useProfile();
  console.log(profileUser);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        let { hasError, message } = checkEditUserData(
          username,
          firstName,
          lastName
        )
        let { isValid, msg } = checkEditUserProfileData(discordTag)
        if (hasError) {
          setError(message)
        } else {
          editUser({
            username,
            first_name: firstName,
            last_name: lastName,
          })
        }
        if (isValid) {
          editProfile({ user: profileUser.state.pk, steam_profile: steamUrl, discord_name_tag: discordTag })
        } else {
          setError(msg)
        }
      }}
    >
      <legend style={{ textAlign: 'center' }}>Profile</legend>
      <div className='mb-3'>
        <label>Username</label>
        <input
          type='text'
          className='form-control'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Email</label>
        <input
          type='email'
          placeholder='email@example.com'
          className='form-control'
          value={user.email}
          disabled
        />
      </div>
      <div className='mb-3'>
        <label>First name</label>
        <input
          type='text'
          className='form-control'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Last Name</label>
        <input
          type='text'
          className='form-control'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Steam Profile Link</label>
        <input
          type='text'
          className='form-control'
          placeholder='URL'
          value={steamUrl}
          onChange={(e) => setSteamUrl(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Discord name with tag</label>
        <input
          type='text'
          className='form-control'
          placeholder='name#tag'
          value={discordTag}
          onChange={(e) => setDiscordTag(e.target.value)}
        />
      </div>
      {error !== '' && <div>{error}</div>}
      <div className='btns'>
        <button type='submit' className='btn btn-success profile-btn'>
          Save
        </button>
        <button type='button' className='btn btn-danger profile-btn'>
          Reset
        </button>
      </div>
    </form>
  )
}

export default EditUser
