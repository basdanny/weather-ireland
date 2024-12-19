import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register'
import App from './App';
import './index.css';

// // Register service worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('sw.js').catch(error => {
//       console.error('Service worker registration failed:', error);
//     });
//   });
// }

const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to user about new content being available
    if (confirm('New content available. Please reload.')) {
      updateSW()
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);