import { useState, useEffect} from 'react'
import productsData from './data/products.json'
import AdminPage from './pages/AdminPage'

import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetail from './components/ProductDetail'
import EditarProducto from './pages/EditarProducto'
import LoginPage from './pages/LoginPage'



function App() {
  const [paginaActual, setPaginaActual] = useState('inicio')
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [products, setProducts] = useState(productsData)
  const [usuario, setUsuario] = useState(null)
  useEffect(() => {
    if (usuario?.token) {
      fetch('http://127.0.0.1:5000/products', {
        headers: { 'Authorization': `Bearer ${usuario.token}` }
      })
        .then(res => res.json())
        .then(data => {
          const normalized = data.data.map(p => ({
            id: p.id,
            nombre: p.name,
            precio: p.price,
            categoria: p.category,
            imagen: '',
            descripcion: p.description,
            stock: p.stock
          }))
          setProducts(normalized)
        })
    }
  }, [usuario])
  const eliminarProducto = async (id) => {
    await fetch(`http://127.0.0.1:5000/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${usuario.token}` }
    })
    setProducts(products.filter(p => p.id !== id))
  }
  const agregarProducto = async (producto) => {
    const response = await fetch('http://127.0.0.1:5000/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}` 
      },
      body: JSON.stringify({
        name: producto.nombre,
        description: producto.descripcion,
        price: producto.precio,
        category: producto.categoria,
        stock: producto.stock,
        sku: `SKU-${Date.now()}`,
        is_active: true
      })
    })
    const data = await response.json()
    if (response.ok) {
      setProducts([...products, { ...producto, id: data.product_id }])
    }
  }
  const editarProducto = async (productoActualizado) => {
    await fetch(`http://127.0.0.1:5000/products/${productoActualizado.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}` 
      },
      body: JSON.stringify({
        name: productoActualizado.nombre,
        description: productoActualizado.descripcion,
        price: productoActualizado.precio,
        category: productoActualizado.categoria,
        stock: productoActualizado.stock,
        is_active: true
      })
    })
    setProducts(products.map(p => p.id === productoActualizado.id ? productoActualizado : p))
  }
  return (
    <div>
        <Header setPagina={setPaginaActual} paginaActual={paginaActual} usuario={usuario} setUsuario={setUsuario} />
        
        {paginaActual === 'inicio' && <HomePage setPagina={setPaginaActual} />}
        {paginaActual === 'catalogo' && <CatalogPage setPagina = {setPaginaActual} setProducto = {setProductoSeleccionado} products = {products} />}
        {paginaActual === 'detalle' && (
          products.find(p => p.id === productoSeleccionado?.id)
            ? <ProductDetail producto={products.find(p => p.id === productoSeleccionado.id)} setPagina={setPaginaActual} />
            : setPaginaActual('catalogo')
        )}
        {paginaActual === 'admin' && (
          usuario && usuario.rol === 'admin'
            ? <AdminPage products={products} setPagina={setPaginaActual} eliminarProducto={eliminarProducto} agregarProducto={agregarProducto} setProductoSeleccionado={setProductoSeleccionado} />
            : <main><p>No tienes permiso para acceder a esta sección.</p></main>
        )}
        {paginaActual === 'editar' && <EditarProducto producto={productoSeleccionado} editarProducto={editarProducto} setPagina={setPaginaActual} />}
        {paginaActual === 'login' && <LoginPage setUsuario={setUsuario} setPagina={setPaginaActual} />}
        
        <Footer />
    </div>
    

  )
} 

export default App