import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import NotFound from './pages/NotFound.jsx';

/** Usado somente no build (scripts/prerender.mjs) para gerar HTML estático. */
export function render(page) {
  return renderToString(page === '404' ? <NotFound /> : <App />);
}
