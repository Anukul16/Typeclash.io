import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Room.css';
import img from '../assets/pic.jpg';

const Room = () => {
  const navigate = useNavigate(); 

  const handleCreateRoom = () => {
    navigate('/room/create');
  };

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
