import React from 'react'
import { Link } from "react-router-dom"

interface SuccessProps {}

const Success: React.FC<SuccessProps> = () => {
  return (
    <div className='success-page'>
      <div className='success'>
        <h3>
          Your application is awaiting payment verification
        </h3>
        <h6>
          Verify your payment transaction now. <Link to="/profile/entries">Verify</Link>
        </h6>
      </div>
    </div>
  )
}

export default Success
