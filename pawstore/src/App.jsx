import { useState } from 'react'
import productsData from './data/products.json'
import AdminPage from './pages/AdminPage'

import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetail from './components/ProductDetail'
import EditarProducto from './pages/EditarProducto'



function App() {
  const [paginaActual, setPaginaActual] = useState('inicio')
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [products, setProducts] = useState(productsData)
  const eliminarProducto = (id) => {
    setProducts (products.filter (p => p.id!== id))
  }
  const agregarProducto = (producto) => {
    const nuevoId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    setProducts ([...products, {... producto, id: nuevoId}])
  }
  const editarProducto = (productoActualizado) =>  {
    setProducts ( products.map(p =>p.id === productoActualizado.id ? productoActualizado:p))
  }
  return (
    <div>
        <Header  setPagina ={setPaginaActual} paginaActual = {paginaActual}  />
        
        {paginaActual === 'inicio' && <HomePage setPagina={setPaginaActual} />}
        {paginaActual === 'catalogo' && <CatalogPage setPagina = {setPaginaActual} setProducto = {setProductoSeleccionado} products = {products} />}
        {paginaActual === 'detalle' && (
          products.find(p => p.id === productoSeleccionado?.id)
            ? <ProductDetail producto={products.find(p => p.id === productoSeleccionado.id)} setPagina={setPaginaActual} />
            : setPaginaActual('catalogo')
        )}
        {paginaActual === 'admin' && <AdminPage products={products} setPagina={setPaginaActual} eliminarProducto={eliminarProducto} agregarProducto={agregarProducto} setProductoSeleccionado={setProductoSeleccionado} />}
        {paginaActual === 'editar' && <EditarProducto producto={productoSeleccionado} editarProducto={editarProducto} setPagina={setPaginaActual} />}
        
        <Footer />
    </div>
    

  )
} 

export default App