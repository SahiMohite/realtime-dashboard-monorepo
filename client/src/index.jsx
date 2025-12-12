import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Check if the DOM element exists before attempting to create the root
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  // If the root element is missing, this would be the cause of the blank page.
  console.error("The DOM element with ID 'root' was not found.");
}