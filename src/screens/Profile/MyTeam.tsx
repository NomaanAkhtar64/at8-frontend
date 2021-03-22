import React from 'react'

interface MyTeamProps {}

const MyTeam: React.FC<MyTeamProps> = () => {
  return (
    <div className='team-data'>
      <table className='table table-hover table-dark text-center'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Game</th>
            <th scope='col'>Players</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7th Sense</td>
            <td>CS:GO</td>
            <td>
              <ol>
                <li>AwA</li>
                <li>A1maxX.</li>
                <li>Nemzu</li>
                <li>Ahm..</li>
                <li>Icy</li>
              </ol>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MyTeam
