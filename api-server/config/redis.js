// Centralizes connection creation to ensure connections are reused.
const Redis = require('ioredis');
const logger = require('../utils/logger');

const REDIS_URL = process.env.REDIS_URL;

// Creates a standard client for general use (if needed)
const redisClient = new Redis(REDIS_URL);
redisClient.on('error', (err) => logger.error('Redis Client Error:', err));
redisClient.on('connect', () => logger.log('✅ Redis Client connected.'));

// Creates a dedicated connection for subscribing (required by Redis)
const redisSubscriber = new Redis(REDIS_URL);
redisSubscriber.on('error', (err) => logger.error('Redis Subscriber Error:', err));
redisSubscriber.on('connect', () => logger.log('✅ Redis Subscriber connected.'));

module.exports = { 
    redisClient, 
    redisSubscriber 
};