import React from 'react'
import { RouteComponentProps } from 'react-router'
import Loading from '../components/Loading'
import TournamentItem from '../components/TournamentItem'
import useTournaments from '../hooks/useTournaments'
import './Tournament.scss'
interface TournamentProps extends RouteComponentProps<{ slug }> {}

const Tournament: React.FC<TournamentProps> = ({ match }) => {
  const tournaments = useTournaments(null, match.params.slug)

  if (tournaments.hasLoaded) {
    return (
      <div className='container my-5 '>
        <div className='row'>
          <div className='tourna-wrapper'>
            <div className='tourna-page'>
              <div className='tourna-heading'>Tournaments</div>
              {tournaments.state.length === 0 && (
                <h3 className='tourna'>No Tournaments Found</h3>
              )}
              {tournaments.state.map((tourna, i) => (
                <TournamentItem tournament={tourna} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <Loading />
}

export default Tournament
