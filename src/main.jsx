import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from './firebaseconfig.js'
import { OrdersApiD } from './AllDataModels/ordersApiD.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrdersApiD>
      <App />
    </OrdersApiD>
  </StrictMode>,
)
