require('dotenv').config();
const express = require('express');
const http = require('http');
const logger = require('./utils/logger');

const { initSocketIO } = require('./services/socketManager');
const { initRedisSubscriber } = require('./services/redisSubscriber');

const PORT = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);

// 1. Initialize Socket.IO with the HTTP server
initSocketIO(httpServer);

// 2. Initialize the Redis Subscriber
initRedisSubscriber();

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', server: 'running', pubsub: 'active' });
});

// 3. Start the combined HTTP/Socket.IO server
httpServer.listen(PORT, () => {
    logger.info(`🌐 Server running and listening on port ${PORT}`);
});