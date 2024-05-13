function setupSocket(io) {
    const socketUsernames = {};

    io.on("connection", socket => {
        console.log(`User connected with id ${socket.id}`);

        socket.on("joinroom", data => {
            const { username, roomId } = data;
            socket.join(roomId);
            console.log(`${username} joined room ${roomId}`);

            
            socketUsernames[socket.id] = username;

            const usernamesInRoom = getUsersInRoom(roomId, socket, socketUsernames);

            
            io.to(roomId).emit('usernames', { usernames: usernamesInRoom, socketId: socket.id });
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected with id ${socket.id}`);
            const disconnectedUsername = socketUsernames[socket.id];
            delete socketUsernames[socket.id];
            io.emit('userDisconnected', { username: disconnectedUsername });
        });
    });
}

function getUsersInRoom(roomId, socket, socketUsernames) {
    const usernames = [];
    Object.keys(socketUsernames).forEach(socketId => {
        if (socket.rooms.has(roomId)) {
            usernames.push(socketUsernames[socketId]);
        }
    });
    return usernames;
}

module.exports = setupSocket;
