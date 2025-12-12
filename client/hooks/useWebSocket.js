import { useState, useEffect } from 'react';
import { socket } from '../services/socketService';

// Define the maximum number of data points to keep for the chart history
const MAX_DATA_POINTS = 60; 

const useWebSocket = (eventName, initialData) => {
  const [latestData, setLatestData] = useState(initialData);
  const [history, setHistory] = useState([]); // NEW STATE for chart data
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on(eventName, (newData) => {
      // 1. Update the latest data for the StockCard
      setLatestData(newData); 

      // 2. Update the history for the LiveChart
      setHistory(prevHistory => {
        // Create a new array with the incoming data point
        const newHistory = [...prevHistory, newData];
        
        // Trim the history if it exceeds the max length
        if (newHistory.length > MAX_DATA_POINTS) {
          return newHistory.slice(newHistory.length - MAX_DATA_POINTS);
        }
        return newHistory;
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(eventName);
    };
  }, [eventName]);

  // Return both the latest data and the historical array
  return { latestData, history, isConnected };
};

export default useWebSocket;