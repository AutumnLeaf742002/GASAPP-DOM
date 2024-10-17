import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'
import { setupIonicReact } from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Configura Ionic React
setupIonicReact();

defineCustomElements(window);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      },
      (err) => {
        console.log('Error al registrar el Service Worker:', err);
      }
    );
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);