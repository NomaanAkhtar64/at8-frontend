import React, { useCallback } from 'react'
import Card from '../components/Card'
import './Home.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import useGames from '../hooks/useGames'
import { useHistory } from 'react-router'
import Loading from '../components/Loading'
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
  if (games.hasLoaded) {
    return (
      <>
        <div className='home-banner'>
          <div className='banner-background'>
            <Swiper
              spaceBetween={40}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={makeBreakPoints()}
            >
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
        <h1>Home</h1>
      </>
    )
  }
  return <Loading />
}

export default Home
