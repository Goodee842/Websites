import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global tactile loading feedback on every button clicked across the application
if (typeof window !== 'undefined') {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest('button');
    if (button && !button.disabled && !button.getAttribute('aria-busy')) {
      button.classList.add('is-loading-click');
      setTimeout(() => {
        button.classList.remove('is-loading-click');
      }, 350);
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

