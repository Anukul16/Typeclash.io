import React, { useState, useEffect } from 'react';
import '../styles/Roomurl.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../redux/slices/roomSlice';
import socket from '../sockets/socket';
import { useParams , useNavigate } from 'react-router-dom';
import { getUserName, generateRandomID } from '../helpers/Roomurlhelper';
import Joineduser from './Joineduser';

const Roomurl = () => {
  const [roomUrl, setRoomUrl] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [clickedCopyButton, setClickCopyButton] = useState(false);
  const [showStartGame, setShowStartGame] = useState(true);
  const [startingRoomId,setStartingRoomId] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomSelector = useSelector((state) => state.room_Slice);
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      const hasId = socket.emit('validateId',id,(resp)=>{
          return resp.response;
      })
      if (!hasId) {
        alert("wrong id");
        return;
      }
      setShowStartGame(false);
      const url = `http://localhost:3000/room/create/${id}`;
      const roomId = id;
      const username = getUserName();
      dispatch(saveUser({ username, roomId }));
      socket.emit("joinroom", {
        username,
        roomId
      });
      setRoomUrl(url);
    } else {
      const roomId = generateRandomID();
      setStartingRoomId(roomId)
      const url = `http://localhost:3000/room/create/${roomId}`;
      const username = getUserName();
      dispatch(saveUser({ username, roomId }));
      
      socket.emit("joinroom", {
        username,
        roomId
      });
      setRoomUrl(url);
    }
    socket.on('redirect',()=>{
      navigate('/')
    })
  }, []);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(roomUrl).then(() => {
      console.log('Link copied to clipboard: ' + roomUrl);
      setClickCopyButton(true);
    }).catch((error) => {
      console.error('Failed to copy link: ', error);
    });
  };

  const handleShow = () => {
    setShowButton(!showButton);
  };
  const handleStart = () => {
    console.log('start clicked ',startingRoomId);
    socket.emit("startGame",startingRoomId);
  }
  

  return (
    <>
      <div className="lobby-wrapper">
        <span>Share this link to invite players</span>
        <span>{clickedCopyButton ? 'Copied!' : 'Click the link to copy!'}</span>
        <div className="lobby-link-container">
          <span className={!showButton ? 'blur' : 'span'}>{roomUrl}</span>
          <div className="lobby-buttons">
            <button onClick={handleCopy} data-tooltip-id="my-tooltip">Copy</button>
            <button onClick={handleShow}>{showButton ? 'Hide' : 'Show'}</button>
          </div>
        </div>
        {showStartGame ? <button className='start_btn' onClick={handleStart}>Start Game</button> : null}
      </div>
      <Joineduser />
    </> 
  );
};

export default Roomurl;
