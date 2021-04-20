import React, { useState } from 'react'
import Field from '../components/Field'
import Form from '../components/Form'
import * as regex from '../regex'
import { Values } from '../func/valueType'
import useUser from '../hooks/user'

interface EditUserProps {
  user: User
  profile: UserProfile
}
interface FormInf extends Values {
  username: string
  firstName: string
  lastName: string
  steamURL: string
  discordTag: string
}
const EditUser: React.FC<EditUserProps> = ({ user, profile }) => {
  const [isDisabled, setDisable] = useState(false)
  const {
    actions: { editProfile, editUser },
  } = useUser()
  return (
    <Form
      initialValues={{
        username: user.username,
        firstName: user.first_name,
        email: user.email,
        lastName: user.last_name,
        steamURL: profile.steam_profile,
        discordTag: profile.discord_name_tag,
      }}
      validate={{
        username: { required: true },
        discordTag: { regex: regex.DISCORD_TAG },
      }}
      onSubmit={async (
        { username, firstName, lastName, steamURL, discordTag }: FormInf,
        e
      ) => {
        setDisable(true)
        await editUser({
          username,
          first_name: firstName,
          last_name: lastName,
        })
        await editProfile({
          user: profile.id,
          steam_profile: steamURL,
          discord_name_tag: discordTag,
        })
        setDisable(false)
      }}
      disable={isDisabled}
      resetClass='btn btn-danger profile-btn'
      submitClass='btn btn-success profile-btn'
      submitText='Save'
      buttonsClass='btns'
      errorContainerClass='sm-error-group'
      reset
    >
      <legend style={{ textAlign: 'center' }}>Profile</legend>
      <Field name='username' type='text' />
      <Field name='email' type='email' readOnly />
      <Field name='firstName' type='text' />
      <Field name='lastName' type='text' />
      <Field name='steamURL' label='Steam Profile Link' type='url' />
      <Field name='discordTag' label='Discord name with tag' type='text' />
    </Form>
  )
}

export default EditUser
