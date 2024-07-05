if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

function setupSocket(io) {
    const socketUsernames = {}; 
    

    io.on("connection", socket => {
        console.log(`User connected with id ${socket.id}`);

        socket.on("joinroom", data => {
            const { username, roomId,time,isOwner} = data;
            if(isOwner){
                localStorage.setItem(`time_${roomId}`,time)
            }
            socket.join(roomId);
            console.log(`${username} joined room ${roomId}`);

            // Store username with the roomId
            if (!socketUsernames[roomId]) {
                socketUsernames[roomId] = [];
            }
            socket.on("sendtime",()=>{
                socket.emit("timing",localStorage.getItem(`time_${roomId}`));
            })
            socketUsernames[roomId].push({ socketId: socket.id, username });

            const usernamesInRoom = getUsersInRoom(roomId, socketUsernames);

           
            
            
            
            io.to(roomId).emit('usernames', { usernames: usernamesInRoom });
        });

        // to check the id of the generated link 
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
        
        // on this event hit it will redirect user to roomtest page
        socket.on("startGame",startingRoomId=>{
            io.to(startingRoomId).emit('redirect')
        })
        socket.on("sendParagraph",(paragraph,roomid)=>{
            io.to(roomid).emit("paragraph",paragraph)
        })
        let roomTimers={}
        socket.on('selectedTiming', (time, roomid) => {
            console.log("Initial time received: ", time);
            const waitingtime = 15
            
            
            roomTimers[roomid] = time;
            localStorage.setItem(`time_${roomid}`, time);
    
            io.to(roomid).emit('setWaitingTime',waitingtime);
            io.to(roomid).emit('timing',roomTimers[roomid])
            setTimeout(()=>{
                if (!roomTimers[`${roomid}_interval`]) {
                    roomTimers[`${roomid}_interval`] = setInterval(() => {
                        if (roomTimers[roomid] > 0) {
                            roomTimers[roomid]--;
                            io.to(roomid).emit('timing', roomTimers[roomid]);
                        } else {
                            clearInterval(roomTimers[`${roomid}_interval`]);
                            io.to(roomid).emit("testoff",roomid)
                            // delete roomTimers[`${roomid}_interval`];
                        }
                    }, 1000);
                }
            },waitingtime*1000)
        });
        socket.on("testresult",(roomid,result)=>{
            console.log("rsult: ",result);
            io.to(roomid).emit("showresult",result)
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






