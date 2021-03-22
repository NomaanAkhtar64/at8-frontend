import React from 'react'
import './LoadingBar.scss'

interface LoadingBarProps {}

const LoadingBar: React.FC<LoadingBarProps> = () => {
  return (
    <div className='loading-bar'>
      <div className='loading-track'></div>
    </div>
  )
}

export default LoadingBar
