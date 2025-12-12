const { redisSubscriber } = require('../config/redis');
const { broadcastData } = require('./socketManager');
const logger = require('../utils/logger');

const CHANNEL_NAME = "stock_feed";
const SOCKET_EVENT = "stockUpdate";

const initRedisSubscriber = () => {
    
    // 1. Subscribe to the channel
    redisSubscriber.subscribe(CHANNEL_NAME, (err, count) => {
        if (err) {
            logger.error('Failed to subscribe to Redis channel:', err);
        } else {
            logger.info(`Subscribed to ${count} Redis channel(s).`);
        }
    });

    // 2. Handle incoming messages from Redis
    redisSubscriber.on('message', (channel, message) => {
        if (channel === CHANNEL_NAME) {
            try {
                const data = JSON.parse(message);
                
                // 3. CRITICAL STEP: Broadcast received data to all Socket.IO clients
                broadcastData(SOCKET_EVENT, data); 
                
            } catch (e) {
                logger.error('Error parsing Redis message:', e);
            }
        }
    });
};

module.exports = { initRedisSubscriber };