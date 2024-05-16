import io from 'socket.io-client';

const socket = io("http://localhost:5000");

// Emitting a message to the server
// socket.emit("message", "Welcome to my typeclash");

// Listen for the 'roomJoined' event
socket.on('usernames', data => {
    const usernames = data; 
    // console.log(usernames);
    console.log('Usernames in the room:');
    Object.keys(usernames).forEach(key => {
        // console.log("Key: ",key);
        console.log(usernames[key]);
    });
});


export default socket;
