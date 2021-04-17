import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import Loading from '../components/Loading'
import TournamentItem from '../components/TournamentItem'
import useTournaments from '../hooks/useTournaments'
import './Tournament.scss'
interface TournamentProps extends RouteComponentProps<{ slug }> {}

const Tournament: React.FC<TournamentProps> = ({ match }) => {
  const tournaments = useTournaments(null, match.params.slug)
  useEffect(() => {
    document.title = "Tournaments - AT8"
  }, [])
  if (tournaments.hasLoaded) {
    return (
      <div className='a1-wrapper'>
        <div className='a1-heading'>Tournaments</div>
        {tournaments.state.length === 0 && (
          <h3 className='a1-body'>No Tournaments Found</h3>
        )}
        {tournaments.state.map((tourna, i) => (
          <TournamentItem tournament={tourna} key={i} />
        ))}
      </div>
    )
  }
  return <Loading />
}

export default Tournament
