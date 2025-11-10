import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/index.css'
import App from './App.jsx'
import "./configs/i18n";
import { AuthProvider } from './configs/api/ApiConfigs.jsx';

createRoot(document.getElementById('root')).render(
    //<StrictMode>
    <App />
    //</StrictMode>
    
)
