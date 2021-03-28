import React from 'react'
import './Card.scss'
//import ValorantArt from '../assets/valorant_art.jpg'
interface CardProps {
  name: string
  image: string
}

const Card: React.FC<CardProps> = ({ image, name }) => {
  return (
    <div className='card'>
      <img src={image} alt='' draggable={false} />
      <div className='card-overlay'>
        <div className='name'>{name}</div>
      </div>
    </div>
  )
}

export default Card
