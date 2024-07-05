import React, { useState, useEffect } from 'react';
import socket from '../sockets/socket';
import { useDispatch, useSelector } from 'react-redux';
import { saveWaitingTimerState, startRoomTestFn } from '../redux/slices/roomSlice';

const Waitingtime = () => {
    const roomSelector = useSelector(state => state.room_Slice);
    const [showDiv, setShowDiv] = useState(true);
    const [timeLeft, setTimeLeft] = useState(roomSelector.waitingTime);
    const dispatch = useDispatch(state => state.room_Slice)
    // socket.on('setWaitingTime',waitingTime=>{
    //     console.log("WatingTime: ",waitingTime);
    //     setTimeLeft(waitingTime);
    // })
    useEffect(() => {
        
        dispatch(saveWaitingTimerState(true))
        const timer = setTimeout(() => {
            setTimeout(() => {
                setShowDiv(true);
            }, 1000);
        });
        const countdown = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(countdown);
                    dispatch(startRoomTestFn(true))
                    dispatch(saveWaitingTimerState(false))
                    setShowDiv(false)
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdown);
        };
    }, []);

    


    return (
        <>
            {showDiv && (
                <div className="animation">Game Starts In:{timeLeft}</div>
            )}
            <style>{`
        .animation {
          width: 14%;
          height: 50px;
          background-color: rgba(255, 0, 0, 0.5);
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          animation: slideDown 1s ease-in-out forwards;
          text-align:center;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          
        }

        @keyframes slideDown {
          0% {
            top: -100px;
          }
          100% {
            top: 1%;
          }
        }

        .timer {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          color: white; 
        }
      `}</style>
        </>
    );
}

export default Waitingtime;
