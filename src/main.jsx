import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FirebaseProvider from './context/Fiebase.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
    </BrowserRouter>
  // </StrictMode>,
)
