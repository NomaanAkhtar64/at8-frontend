import React, { useCallback } from 'react'
import Card from '../components/Card'
import './Home.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import useGames from '../hooks/useGames'
import { useHistory } from 'react-router'
import Loading from '../components/Loading'
import useHome from '../hooks/useHome'
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const games = useGames()
  let makeBreakPoints = useCallback(() => {
    let obj = {} as typeof Swiper.defaultProps.breakpoints
    let cardWidth = 400
    let cardMargin = 40
    let bannerBreak = 992
    let arr = [...Array(games.state.length).keys()]
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
  }, [games.state])
  const history = useHistory()
  const home = useHome()
  if (games.hasLoaded) {
    return (
      <>
        {home.hasLoaded ? (
          <div className='art-gif'>
            {home.state.map((video, i) => (
              <div key={i} className='video-container'>
                <video
                  id='at8-gif'
                  src={video.video}
                  width='100%'
                  autoPlay
                  muted
                  onEnded={() =>
                    (document.getElementById('at8-gif').style.display = 'none')
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}

        <div className='home-banner' style={{ width: '100%' }}>
          <div className='banner-background'>
            <Swiper spaceBetween={40} breakpoints={makeBreakPoints()}>
              {games.state.map((game, idx) => (
                <SwiperSlide
                  key={idx}
                  onClick={() => history.push(`tournaments/${game.slug}`)}
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
  return <Loading />
}

export default Home
