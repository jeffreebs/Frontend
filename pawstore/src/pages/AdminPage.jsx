import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'

function AdminPage() {
  const [products, setProducts] = useState([])
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', stock: ''
  })
  const { usuario } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    getProducts().then(data => {
      const normalized = data.data.map(p => ({
        id: p.id, nombre: p.name, precio: p.price,
        categoria: p.category, imagen: p.image_url || '', descripcion: p.description, stock: p.stock
      }))
      setProducts(normalized)
    })
  }, [])

  const eliminarProducto = async (id) => {
    const { ok } = await deleteProduct(id, usuario.token)
    if (ok) {
      setProducts(products.filter(p => p.id !== id))
    } else {
      alert('Error al eliminar el producto.')
    }
  }

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria) {
      alert('Por favor completa los campos requeridos.')
      return
    }
    const { data, ok } = await createProduct({
      name: nuevoProducto.nombre, description: nuevoProducto.descripcion,
      price: nuevoProducto.precio, category: nuevoProducto.categoria,
      stock: nuevoProducto.stock, sku: `SKU-${Date.now()}`, is_active: true
    }, usuario.token)
    if (ok) {
      setProducts([...products, { ...nuevoProducto, id: data.product_id }])
      setNuevoProducto({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', stock: '' })
    } else {
      alert('Error al agregar el producto.')
    }
  }

  return (
    <main>
      <h1>Administración de productos</h1>
      <p>En esta sección puedes gestionar el catálogo de productos de PawStore</p>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th>Stock</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>
                <button onClick={() => navigate(`/admin/editar/${producto.id}`)}>Editar</button>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="admin-form">
        <h2>Agregar nuevo producto</h2>
        <label>Nombre</label>
        <input value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} />
        <label>Descripción</label>
        <input value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({...nuevoProducto, descripcion: e.target.value})} />
        <label>Precio</label>
        <input value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})} />
        <label>Categoría</label>
        <input value={nuevoProducto.categoria} onChange={(e) => setNuevoProducto({...nuevoProducto, categoria: e.target.value})} />
        <label>URL de la imagen</label>
        <input value={nuevoProducto.imagen} onChange={(e) => setNuevoProducto({...nuevoProducto, imagen: e.target.value})} />
        <label>Stock</label>
        <input value={nuevoProducto.stock} onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})} />
        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>
    </main>
  )
}

export default AdminPage