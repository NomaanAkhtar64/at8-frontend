import React, { useCallback } from 'react'
import Card from '../components/Card'
import './Home.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import { useHistory } from 'react-router'
import useHome from '../hooks/useHome'
import useGames from '../hooks/games'
import Title from '../components/Title'

let hasVideoPlayed = false
const Home: React.FC = () => {
  const games = useGames()
  let makeBreakPoints = useCallback(() => {
    let obj = {} as typeof Swiper.defaultProps.breakpoints
    let cardWidth = 400
    let cardMargin = 40
    let bannerBreak = 992
    let arr = [...Array(games.length).keys()]
    for (let i in arr) {
      let idx = arr[i]
      let currentSize = (idx + 1) * cardWidth + idx * cardMargin
      if (currentSize > bannerBreak) {
        currentSize = currentSize + currentSize * 0.2
      }
      obj[currentSize] = {
        spaceBetween: idx === 0 ? 0 : cardMargin,
        slidesPerView: idx + 1,
      }
    }
    return obj
  }, [games])
  const history = useHistory()
  const home = useHome()

  return (
    <>
      <Title>Home - AT8</Title>
      <div className='art-gif'>
        {!hasVideoPlayed &&
          home.hasLoaded &&
          home.state.map((video, i) => (
            <div key={i} className='video-container'>
              <video
                id='at8-gif'
                src={video.video}
                width='100%'
                autoPlay
                muted
                onLoadStart={() => {
                  hasVideoPlayed = true
                }}
                onEnded={() => {
                  document.getElementById('at8-gif').style.display = 'none'
                }}
              />
            </div>
          ))}
      </div>

      <div className='home-banner' style={{ width: '100%' }}>
        <div className='banner-background'>
          <Swiper spaceBetween={40} breakpoints={makeBreakPoints()}>
            {games.map((game, idx) => (
              <SwiperSlide
                key={idx}
                onClick={() => history.push(`tournament/${game.slug}`)}
              >
                <Card image={game.picture} name={game.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default Home
