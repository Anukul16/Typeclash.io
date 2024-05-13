import { useState, useEffect } from 'react';

const useTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialTime]);

  return time;
};

export default useTimer;
