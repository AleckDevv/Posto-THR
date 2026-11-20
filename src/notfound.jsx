import '@fontsource-variable/manrope';
import '@fontsource-variable/inter';
import './styles/globals.css';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import NotFound from './pages/NotFound.jsx';

const root = document.getElementById('root');
const page = (
  <StrictMode>
    <NotFound />
  </StrictMode>
);

if (root.firstElementChild) hydrateRoot(root, page);
else createRoot(root).render(page);
