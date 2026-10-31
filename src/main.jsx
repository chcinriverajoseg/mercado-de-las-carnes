import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShopProvider } from './context/ShopContext.jsx'
import { CatalogoProvider } from './context/CatalogoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CatalogoProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </CatalogoProvider>
  </StrictMode>,
)
