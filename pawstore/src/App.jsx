import { useState } from 'react'

import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetail from './components/ProductDetail'



function App() {
  const [paginaActual, setPaginaActual] = useState('inicio')
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  return (
    <div>
        <Header  setPagina ={setPaginaActual} paginaActual = {paginaActual}  />
        
        {paginaActual === 'inicio' && <HomePage setPagina={setPaginaActual} />}
        {paginaActual === 'catalogo' && <CatalogPage setPagina = {setPaginaActual} setProducto = {setProductoSeleccionado} />}
        {paginaActual === 'detalle' && <ProductDetail producto = {productoSeleccionado} setPagina = {setPaginaActual} />}

        <Footer />
    </div>
    

  )
} 

export default App