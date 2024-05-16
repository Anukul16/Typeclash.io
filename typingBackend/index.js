const express = require('express');
const app = express();
const paragraphRouter = require('../typingBackend/routes/paragraphRoute');
const userRouter = require('../typingBackend/routes/userRoute.js');
const leaderboardRouter = require('./routes/leaderboardRoute.js')
const cors = require('cors');
const path = require('path');
const db = require('../typingBackend/config/dbconfig.js');
const { Server } = require('socket.io');
const http = require('http');
const setupSocket = require('./socket/socket.js');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server and configure CORS
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:4000", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    console.log("working");
    res.send("Hello, World!");
});

app.use('/api', paragraphRouter);
app.use('/auth', userRouter);
app.use('/auth',leaderboardRouter);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


setupSocket(io)

// module.exports = io;
