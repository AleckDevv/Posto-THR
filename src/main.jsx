import '@fontsource-variable/manrope';
import '@fontsource-variable/inter';
import './styles/globals.css';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Em produção o HTML já vem pré-renderizado: apenas hidratamos.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
