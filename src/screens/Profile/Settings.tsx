import React from 'react'
import Loading from '../../components/Loading'
import useProfile from '../../hooks/useProfile'
import EditUser from '../../forms/EditUser'
import ChangePassword from '../../forms/ChangePassword'
import EditProfilePic from '../../forms/EditProfilePic'
interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const profile = useProfile()

  if (profile.hasLoaded && profile.profile) {
    return (
      <div className='profile-data'>
        <div className='profile-pic'>
          <EditProfilePic />
        </div>
        <div className='profile'>
          <EditUser user={profile.state} profile={profile.profile} />
        </div>
        <div className='password-form '>
          <ChangePassword />
        </div>
      </div>
    )
  }
  return <Loading />
}

export default Settings
