import React from 'react'
import Testcontainer from './Testcontainer'
import Resultcontainer from './Resultcontainer'
import { useSelector } from 'react-redux'
import JoinedUser from './Joineduser'
import socket from '../sockets/socket'

const Roomtest = () => {

    const roomSelector = useSelector(state => state.room_Slice)
    
  return (
    <>
        <JoinedUser />
        <Testcontainer />
        {
            roomSelector.isGameStarted ? <Resultcontainer /> : null
        }
    </>
  )
}

export default Roomtest