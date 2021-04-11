import React from 'react'
import Field from '../components/Field'
import Form from '../components/Form'
import { Values } from '../func/valueType'
import changePassword from '../hooks/changePassword'

interface ChangePasswordProps {}
interface FormInf extends Values {
  password: string
  confirmPassword: string
}
const ChangePassword: React.FC<ChangePasswordProps> = () => {
  return (
    <Form
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={({ password, confirmPassword }: FormInf, e) => {
        changePassword(password, confirmPassword)
      }}
      validate={{
        password: { required: true, equal: 'confirmPassword', minLength: 8 },
        confirmPassword: { required: true },
      }}
      resetClass='btn btn-danger profile-btn'
      submitClass='btn btn-success profile-btn'
      submitText='Save'
      buttonsClass='btns'
      errorContainerClass='sm-error-group'
      reset
    >
      <legend>Change Password</legend>
      <Field name='password' type='password' />
      <Field name='confirmPassword' type='password' />
    </Form>
  )
}

export default ChangePassword
