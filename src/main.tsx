import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

// Static routes are pre-rendered at build time with a complete page scaffold
// already inside #root. Mounting React with createRoot() on top of that content
// replaces it and makes the pre-rendered article flash briefly before disappearing.
// Only boot the SPA when #root is empty (the normal Vite index.html case).
const hasPrerenderedContent = rootElement.childElementCount > 0 || Boolean(rootElement.textContent?.trim());

if (!hasPrerenderedContent) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
