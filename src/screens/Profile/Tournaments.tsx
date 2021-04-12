import React from 'react'
import { Link } from 'react-router-dom'

interface TournamentsProps {
  entries: EntryDetail[]
}

const Tournaments: React.FC<TournamentsProps> = ({ entries }) => {
  return (
    <div className='tournament-data'>
      <table className='table table-hover table-dark text-center my-4'>
        <thead>
          <tr>
            <th style={{ width: '20%' }} scope='col'>
              Tournament
            </th>
            <th style={{ width: '20%' }} scope='col'>
              Game
            </th>
            <th style={{ width: '20%' }} scope='col'>
              Team
            </th>
            <th style={{ width: '20%' }} scope='col'>
              Payment
            </th>
            <th style={{ width: '20%' }} scope='col'>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.tournament.name}</td>
              <td>{entry.tournament.game.name}</td>
              <td>{entry.team.name}</td>
              <td>
                {entry.has_paid ? (
                  'Paid'
                ) : (
                  <>
                    Not Paid
                    <Link
                      to={`/entry/verify/${entry.entry_id}`}
                      style={{ display: 'block' }}
                    >
                      Verify
                    </Link>
                  </>
                )}
              </td>
              <td>{entry.date.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tournaments
