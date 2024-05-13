
export const generateRandomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomID = '';
    for (let i = 0; i < 6; i++) {
      randomID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomID;
  };

  export const generateRandomUsername = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let username = '';

    for (let i = 0; i < 5; i++) {
      username += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    username += '_';

    for (let i = 0; i < 2; i++) {
      username += Math.floor(Math.random() * 10);
    }

    return username;
  };

  export const getUserName = () => {
    if (localStorage.getItem('username')) {
      return localStorage.getItem('username');
    } else {
      return generateRandomUsername();
    }
  };