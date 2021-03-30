import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import './TournamentItem.scss'

interface TournamentItemProps {
  tournament: Tournament
}

const TournamentItem: React.FC<TournamentItemProps> = ({ tournament }) => {
  const {
    name,
    slots,
    teams,
    details,
    starting_time,
    ending_time,
    winner,
    prize,
    registration_date,
  } = tournament
  const date = new Date(new Date().getTime())
  const today = Date.parse(date.toString())
  console.log(winner)
  return (
    <div className='tourna'>
      <div className='tourna-top'>
        <h3 className='tourna-name'>{name}</h3>
        <p className='tourna-body'>{parse(details)}</p>
      </div>
      <div className='tourna-bottom'>
        <div className='tourna-left'>
          {!winner && <h4>Slots Available: {slots - teams.length}</h4>}

          <div className='tourna-time'>
            <h6>
              From:
              <span className='grey'> {starting_time}</span>
            </h6>
            <h6>
              To:
              <span className='grey'> {ending_time}</span>
            </h6>
          </div>
        </div>
        <div className='tourna-right'>
          {winner ? (
            <div className='winner'>
              <img src={winner.logo} alt='' />
              <div className='winner-body'>
                <h4>Winner</h4>
                <h4 className='grey'>{winner.name}</h4>
              </div>
            </div>
          ) : (
            <>
              <h4 className='px-2'>Prize Pool: {prize}</h4>

              {today >= Date.parse(registration_date) &&
              today < Date.parse(starting_time) ? (
                <div className='register-btn'>
                  <button type='button' className='btn btn-danger btn-lg'>
                    {slots - teams.length > 0 ? (
                      <Link
                        to={{ pathname: '/register', state: {tournament} }}
                        style={{
                          textDecoration: 'none',
                          color: '#fff',
                        }}
                      >
                        Register
                      </Link>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-danger btn-lg'
                        disabled
                      >
                        Slots Are Full
                      </button>
                    )}
                  </button>
                </div>
              ) : (
                <h6 className='tourna-registerdate'>
                  Registration Open:
                  <span className='grey'> {registration_date}</span>
                </h6>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TournamentItem
