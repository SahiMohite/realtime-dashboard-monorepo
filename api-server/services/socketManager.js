const { Server } = require('socket.io');
const logger = require('../utils/logger');

let io; // Variable to hold the Socket.IO server instance

const initSocketIO = (httpServer) => {
    // 1. Configure Socket.IO
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN || "*", // Use VITE_API_URL from client in real deployment
            methods: ["GET", "POST"]
        }
    });

    // 2. Handle connections
    io.on('connection', (socket) => {
        logger.info(`Client connected: ${socket.id}`);
        
        socket.on('disconnect', () => {
            logger.info(`Client disconnected: ${socket.id}`);
        });
    });

    logger.info('Socket.IO initialized.');
    return io;
};

// Function to send data to all clients, used by the redisSubscriber
const broadcastData = (event, data) => {
    if (io) {
        // Broadcast data using the defined event name
        io.emit(event, data);
        logger.log(`Broadcasted ${event} data to ${io.engine.clientsCount} clients.`);
    }
};

module.exports = { 
    initSocketIO, 
    broadcastData 
};