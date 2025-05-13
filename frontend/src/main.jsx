import './index.css'; // Import Tailwind CSS
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
