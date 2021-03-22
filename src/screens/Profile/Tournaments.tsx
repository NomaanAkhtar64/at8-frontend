import React from 'react'

interface TournamentsProps {}

const Tournaments: React.FC<TournamentsProps> = () => {
  return (
    <div className='tournament-data'>
      <table className='table table-hover table-dark text-center'>
        <thead>
          <tr>
            <th style={{ width: '40%' }} scope='col'>
              Tournament
            </th>
            <th style={{ width: '30%' }} scope='col'>
              Game
            </th>
            <th style={{ width: '30%' }} scope='col'>
              Winner
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Grand Tournament</td>
            <td>CS:GO</td>
            <td>Exothermic</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Tournaments
