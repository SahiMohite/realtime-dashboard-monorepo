import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Initialize and export the socket connection
export const socket = io(API_URL, {
    reconnectionAttempts: 5,
    transports: ['websocket']
});