import React from 'react'
import '../styles/Leaderboard.css'

const Leaderboard = () => {
  return (
    <>
      <div className="wrapper">
        <table className='leaderboard'>
          <thead>
            <tr>
              <th>User</th>
              <th>WPM</th>
              <th>Accuracy</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((row, index) => ( */}
            <tr key="">
              <td>hello</td>
              <td>87</td>
              <td>76</td>
              <td>22 march</td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Leaderboard