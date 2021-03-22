import React from 'react'
import './Loading.scss'

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className='loading-screen'>
      <div className='big-text'>Loading</div>
      <div className='dots-array'>
        <svg
          width='38'
          height='38'
          viewBox='0 0 38 38'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='19' cy='19' r='17.5' stroke='#666' stroke-width='3' />
        </svg>
        <svg
          width='38'
          height='38'
          viewBox='0 0 38 38'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='19' cy='19' r='17.5' stroke='#666' stroke-width='3' />
        </svg>
        <svg
          width='38'
          height='38'
          viewBox='0 0 38 38'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='19' cy='19' r='17.5' stroke='#666' stroke-width='3' />
        </svg>
      </div>
    </div>
  )
}

export default Loading
