import React from 'react'
import useGames from '../hooks/games'

import './Games.scss'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const games = useGames()
  return (
    <div className='grand-parent'>
      {games.map((game, i) => (
        <div key={i} className='parent'>
          <div className='game-child'>
            <div className='image-container'>
              <img src={game.picture} alt='Tournament Thumbnail' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
