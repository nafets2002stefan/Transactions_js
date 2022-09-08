import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'font-awesome/css/font-awesome.css';
import '../src/components/i18n';
import i18next from 'i18next';

const lang = localStorage.getItem('lang') || 'en';
i18next.changeLanguage(lang);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

reportWebVitals();
