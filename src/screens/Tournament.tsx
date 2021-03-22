import React from 'react'
import { RouteComponentProps } from 'react-router'
import './Tournament.scss'
interface TournamentProps extends RouteComponentProps<{ slug }> {}

const Tournament: React.FC<TournamentProps> = ({ match }) => {
  const tournamentSlug = match.params.slug
  console.log(tournamentSlug)

  return <div className='tournament-list-container'></div>
}

export default Tournament
