import React from 'react'

interface EditProfilePicProps {}

const EditProfilePic: React.FC<EditProfilePicProps> = () => {
  return (
    <form>
      <legend>Profile Picture</legend>

      <div className='form-group'>
        <div className='input-group mb-3'>
          <div className='custom-file'>
            <input
              type='file'
              accept='image/*'
              className='custom-file-input'
              id='inputGroupFile02'
            />
            <label className='custom-file-label'>Choose file</label>
          </div>
        </div>
      </div>
      <div className='btns'>
        <button type='submit' className='btn btn-success'>
          Upload
        </button>
      </div>
    </form>
  )
}

export default EditProfilePic
