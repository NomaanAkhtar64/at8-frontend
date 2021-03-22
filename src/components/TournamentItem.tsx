import React from 'react'
import './TournamentItem.scss'

interface TournamentItemProps {}
const TournamentItem: React.FC<TournamentItemProps> = () => {
  return (
    <div className='p-2 col-lg-6 col-12 tour-item-wrapper'>
      <div className='tour-item '>
        <div className='row'>
          <div className='col-12 col-md-8'>Left</div>
          <div className='col-12 col-md-4'>Right</div>
        </div>
      </div>
    </div>
  )
}

export default TournamentItem
