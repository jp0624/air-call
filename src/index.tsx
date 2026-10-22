import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {CallProvider} from './context/CallContext';
import App from './App';
import './styles.css';
createRoot(document.getElementById('app')!).render(<StrictMode><CallProvider><App/></CallProvider></StrictMode>);
