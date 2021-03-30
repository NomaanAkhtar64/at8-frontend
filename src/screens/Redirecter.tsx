import React from 'react'
import { Redirect } from 'react-router'

interface RedirecterProps {}

const Redirecter: React.FC<RedirecterProps> = ({}) => {
  return <Redirect to='/login/?redirect=true'></Redirect>
}

export default Redirecter
