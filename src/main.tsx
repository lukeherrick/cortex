import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { installRefreshOnUpdate } from '@/pwa/refresh';

// Without this, a deploy is invisible until the app is opened twice.
installRefreshOnUpdate({
  container: 'serviceWorker' in navigator ? navigator.serviceWorker : null,
  reload: () => window.location.reload(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
