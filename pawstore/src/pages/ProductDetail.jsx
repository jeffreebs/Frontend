import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useApp } from '../context/AppContext'
import { formatearPrecio } from '../utils/formato'

function ProductDetail() {
  const { id } = useParams()
  const { agregarAlCarrito } = useApp()
  const [productoDetalle, setProductoDetalle] = useState(null)
  const [noEncontrado, setNoEncontrado] = useState(false)

  useEffect(() => {
    getProductById(id).then(({ data, ok }) => {
      if (!ok || !data.data) {
        setNoEncontrado(true)
        return
      }
      const p = data.data
      setProductoDetalle({
        id: p.id,
        nombre: p.name,
        precio: p.price,
        categoria: p.category,
        imagen: p.image_url || `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(p.name)}`,
        descripcion: p.description,
        stock: p.stock
      })
    })
  }, [id])

  if (noEncontrado) return (
    <main>
      <h1>Producto no encontrado</h1>
      <p>El producto que buscás no existe o fue eliminado.</p>
      <Link to="/productos">Volver al catálogo</Link>
    </main>
  )

  if (!productoDetalle) return <p>Cargando...</p>

  return (
    <main className="detalle">
      <div className="detalle-imagen">
        <img src={productoDetalle.imagen} alt={productoDetalle.nombre} />
      </div>
      <div className="detalle-info">
        <h2>{productoDetalle.nombre}</h2>
        <p>{formatearPrecio(productoDetalle.precio)}</p>
        <p>{productoDetalle.categoria}</p>
        <p>{productoDetalle.descripcion}</p>
        <button onClick={() => agregarAlCarrito(productoDetalle)}>Agregar al carrito</button>
        <Link to="/productos">Volver al Catálogo</Link>
      </div>
    </main>
  )
}

export default ProductDetail