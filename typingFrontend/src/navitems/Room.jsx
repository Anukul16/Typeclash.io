import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Room.css';
import img from '../assets/pic.jpg';
import { saveRoomCreationState, saveUsername } from '../redux/slices/roomSlice';
import { useDispatch } from 'react-redux';
const Room = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  const handleCreateRoom = () => {
    navigate('/room/create');
    dispatch(saveRoomCreationState(true))
  };
  
  useEffect(()=>{
    dispatch(saveUsername(''))
  },[])

  return (
    <div>
      <div className="room-card">
        <img src={img} alt="Room_Image" className="room-image" />
        <button onClick={handleCreateRoom} className="create-room-button">Create Room</button>
      </div>
    </div>
  );
};

export default Room;
