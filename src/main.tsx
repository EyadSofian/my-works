import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// StrictMode intentionally omitted: it double-invokes effects in dev, which
// double-mounts the R3F canvas / GSAP ScrollTriggers. Production is unaffected.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
