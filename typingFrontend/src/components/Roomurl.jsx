import React, { useState, useEffect } from 'react';
import '../styles/Roomurl.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../redux/slices/roomSlice';
import socket from '../sockets/socket';
import { useParams } from 'react-router-dom';
import { getUserName,generateRandomID} from '../helpers/Roomurlhelper';
import Joineduser from './Joineduser';

let roomIds = []
const Roomurl = () => {
  const [roomUrl, setRoomUrl] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [clickedCopyButton, setClickCopyButton] = useState(false);
  const [showStartGame, setShowStartGame] = useState(true)

  const dispatch = useDispatch();
  const roomSelector = useSelector((state) => state.room_Slice)
  console.log(roomSelector);
  const { id } = useParams()
  // console.log("Id: ",id);

  // const [roomIds, setRoomIds] = useState(() => {
  //   // Initialize roomIds array from localStorage on component mount
  //   const existingIds = localStorage.getItem('roomIds');
  //   return existingIds ? JSON.parse(existingIds) : [];
  // });
  useEffect(() => {
    console.log("Id: ",id);
    if (id) {
      const existingIds = localStorage.getItem('roomIds')
      const existingIdsArray = existingIds ? JSON.parse(existingIds) : [];
      console.log(existingIdsArray);
      const isIdPresent = existingIdsArray.includes(id);
      if (!isIdPresent) {
        alert("wrong id")
        return;
      }
      setShowStartGame(false)
      const url = `http://localhost:3000/room/create/${id}`;
      const roomId = id;
      const username = getUserName();
      dispatch(saveUser({ username, roomId }));
      console.log("Id from if: ", roomId);
      socket.emit("joinroom", {
        username,
        roomId
      });
      setRoomUrl(url);
    } else {
      const roomId = generateRandomID();
      const url = `http://localhost:3000/room/create/${roomId}`;
      const username = getUserName();
      dispatch(saveUser({ username, roomId }));
      roomIds.push(roomId);
      localStorage.setItem('roomIds',JSON.stringify([...roomIds,roomId]))
      // setRoomIds([...roomIds, roomId]); 
      // localStorage.setItem('roomIds', JSON.stringify([roomId,...roomIds]));
      // localStorage.removeItem('roomIds')
      console.log("Roomids: ",[...roomIds,roomId]);

      socket.emit("joinroom", {
        username,
        roomId
      });
      setRoomUrl(url);
    }
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
    setShowButton(true);
  };

  return (
    <>
      <div className="lobby-wrapper">
        <span>Share this link to invite players</span>
        <span>{clickedCopyButton ? 'Copied!' : 'Click the link to copy!'}</span>
        <div className="lobby-link-container">
          <span className={!showButton ? 'blur' : ''}>{roomUrl}</span>
          <div className="lobby-buttons">
            <button onClick={handleCopy} data-tooltip-id="my-tooltip">Copy</button>
            <button onClick={handleShow}>Show</button>
          </div>
        </div>
        {showStartGame ? <button className='start_btn'>Start Game</button> : null}
      </div>
      <Joineduser / >
    </>
  );
};


export default Roomurl;

