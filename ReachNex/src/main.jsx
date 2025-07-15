import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <>
    <ToastContainer
    position="bottom-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    theme="light"
/>

    <App />
    </>
)
