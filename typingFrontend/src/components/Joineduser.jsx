import React, { useState, useEffect } from 'react';
import socket from '../sockets/socket';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, saveUser } from '../redux/slices/roomSlice';

const JoinedUser = () => {
  const [usernames, setUsernames] = useState([]);
  const dispatch = useDispatch()
  const roomSelector = useSelector(state => state.room_Slice)

  useEffect(() => {
    socket.on('usernames', data => {
      // console.log("Use:",data.usernames);
      dispatch(saveUser(data.usernames))
      setUsernames(data.usernames);
    });

    socket.on('userDisconnected', data => {
      setUsernames(prevUsernames => prevUsernames.filter(username => username !== data.username));
      dispatch(removeUser(data.username))
  });
  

    return () => {
      socket.off('usernames');
      socket.off('userDisconnected');
    };
  }, []);
  console.log("From joineduse: ",roomSelector.rooms);
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Joined Users</h1>
      <div style={styles.userList}>
        {/* {usernames.map((username, index) => (
          <div key={index} style={styles.userItem}>{username}</div>
        ))} */}
        {
          roomSelector.rooms.map((username,index)=>(
            <div key={index} style={styles.userItem}>{username}</div>
          ))
        }
      </div>
    </div>
  );
  
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  userList: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userItem: {
    padding: '10px',
    color: 'black',
    margin: '5px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
  }
};

export default JoinedUser;
