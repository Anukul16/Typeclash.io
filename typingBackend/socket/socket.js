if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

function setupSocket(io) {
    const socketUsernames = {}; 
    

    io.on("connection", socket => {
        console.log(`User connected with id ${socket.id}`);

        socket.on("joinroom", data => {
            const { username, roomId,isOwner } = data;
            socket.join(roomId);
            console.log(`${username} joined room ${roomId}`);

            // Store username with the roomId
            if (!socketUsernames[roomId]) {
                socketUsernames[roomId] = [];
            }
            socketUsernames[roomId].push({ socketId: socket.id, username });

            const usernamesInRoom = getUsersInRoom(roomId, socketUsernames);

            
            io.to(roomId).emit('usernames', { usernames: usernamesInRoom });
        });
        socket.on("validateId",(id,callback)=>{
            const hasId = localStorage.getItem(id);
            if(hasId){
                callback({
                    response:true 
                })
            }else{
                callback({
                    response:false
                })
            }
        })
        
        socket.on("startGame",startingRoomId=>{
            io.to(startingRoomId).emit('redirect')
            socket.on("sendParagraph",paragraph=>{
                io.to(startingRoomId).emit("paragraph",paragraph)
            })
            socket.on('duration',time=>{
                io.to(startingRoomId).emit('testDuration',time)
            })
        })
        
        socket.on("disconnect", () => {
            console.log(`User disconnected with id ${socket.id}`);
        
            
            for (const roomId in socketUsernames) {
                const disconnectedUserIndex = socketUsernames[roomId].findIndex(user => user.socketId === socket.id);
                if (disconnectedUserIndex !== -1) {
                    
                    const disconnectedUsername = socketUsernames[roomId][disconnectedUserIndex].username;
        
                    // Removing the disconnected user from the user list of the room on that index
                    // Demo :- how id and sid and username are stored
                    // Yj96Li: [
                    //     { socketId: 'OnT41rbeEf1JVEHHAAAD', username: 'jdlhf_02' },
                    //     { socketId: 'v0Dk5JGUrJM8xPDGAAAF', username: 'nlchl_49' }
                    // ]
                    // 
                    socketUsernames[roomId].splice(disconnectedUserIndex, 1);
        
                    io.to(roomId).emit('userDisconnected', { username: disconnectedUsername });
                    break; 
                }
            }
        });
        
    });
}

function getUsersInRoom(roomId, socketUsernames) {
    const usernames = [];
    // console.log(socketUsernames);
    if (socketUsernames[roomId]) {
        socketUsernames[roomId].forEach(user => {
            usernames.push(user.username);
        });
    }
    return usernames;
}

module.exports = setupSocket;






