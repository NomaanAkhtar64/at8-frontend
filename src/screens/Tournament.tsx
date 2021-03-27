import React from 'react'
import { RouteComponentProps } from 'react-router'
import TournamentItem from '../components/TournamentItem'
import './Tournament.scss'
interface TournamentProps extends RouteComponentProps<{ slug }> {}

const Tournament: React.FC<TournamentProps> = ({ match }) => {
  // const tournamentSlug = match.params.slug

  return (
    <div className='container my-5 '>
      <div className='row'>
        <TournamentItem />
        {/* <TournamentItem /> */}
        {/* <TournamentItem />
        <TournamentItem /> */}
      </div>
    </div>
  )
}

export default Tournament
