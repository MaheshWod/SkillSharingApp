import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/auth';
import { SearchProvider } from './Context/search';
import { CartProvider } from './Context/cart';
import 'antd/dist/reset.css'; // Import global styles
// import * as antd from 'antd';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <SearchProvider>
        <CartProvider>
            <App />
        </CartProvider>
        </SearchProvider>
    </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
