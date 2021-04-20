import React, { useEffect } from 'react'
import EditUser from '../../forms/EditUser'
import ChangePassword from '../../forms/ChangePassword'
import EditProfilePic from '../../forms/EditProfilePic'
import useUser from '../../hooks/user'
interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const user = useUser()

  useEffect(() => {
    document.title = 'Settings - AT8'
  }, [])
  return (
    <div className='profile-data'>
      <div className='profile-pic'>
        <EditProfilePic profile={user.state.profile} />
      </div>
      <div className='profile'>
        <EditUser user={user.state.user} profile={user.state.profile} />
      </div>
      <div className='password-form '>
        <ChangePassword />
      </div>
    </div>
  )
}

export default Settings
