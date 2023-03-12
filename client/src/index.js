import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

const rootElement = document.getElementById('root');

// Create a root for ReactDOM to render into
const root = ReactDOM.createRoot(rootElement);

// Render your app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);