import React from 'react'
import Testcontainer from './Testcontainer'
import Resultcontainer from './Resultcontainer'
import { useSelector } from 'react-redux'
import JoinedUser from './Joineduser'

const Roomtest = () => {

    const roomSelector = useSelector(state => state.room_Slice)
    
  return (
    <>
        <JoinedUser />
        <Testcontainer />
        {
          roomSelector.isGameStarted && roomSelector.isWaitingTimerRunning? <Resultcontainer /> : null
        }
        {/* <Resultcontainer /> */}
    </>
  )
}

export default Roomtest