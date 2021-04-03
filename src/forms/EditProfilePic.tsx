import React, { useState } from 'react'
import editProfile from '../hooks/editProfile'
import useProfile from '../hooks/useProfile'
import imgToBase64 from '../utils/imgToBase64'
import checkEditProfilePic from '../errors/check/checkEditProfiePic'
interface EditProfilePicProps {
  profile: UserProfile
}
const EditProfilePic: React.FC<EditProfilePicProps> = ({ profile }) => {
  const [pic, setPic] = useState<File>(null)
  const [picUrl, setPicUrl] = useState(null)
  const [error, setError] = useState<string>(null)

  const profileUser = useProfile()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const { isValid, message } = checkEditProfilePic(pic)
        if (isValid) {
          setError(null)
          const pic64 = await imgToBase64(pic)
          editProfile({ user: profileUser.state.pk, pic: pic64 })
        } else {
          setError(message)
        }
      }}
    >
      <legend>Profile Picture</legend>

      <div className='profile-pic-container'>
        <img
          src={picUrl ? picUrl.picUrl : profile.pic}
          alt='Profile Pic'
          width='100%'
        />
      </div>

      <legend>Change Profile Picture</legend>
      <div className='form-group'>
        <div className='input-group mb-3'>
          <div className='custom-file'>
            <input
              type='file'
              accept='image/*'
              className='custom-file-input'
              id='inputGroupFile02'
              onChange={(e) => {
                setPic(e.target.files[0])
                setPicUrl({
                  picUrl: URL.createObjectURL(e.target.files[0]),
                })
              }}
            />
            <label className='custom-file-label'>
              {pic ? <p>{pic['name']}</p> : 'Choose file'}
            </label>
          </div>
        </div>
      </div>
      {error && <div className='error'>{error}</div>}
      <div className='btns'>
        <button type='submit' className='btn btn-success'>
          Upload
        </button>
      </div>
    </form>
  )
}

export default EditProfilePic
