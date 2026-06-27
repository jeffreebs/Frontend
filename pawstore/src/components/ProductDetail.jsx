import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agregarAlCarrito } = useApp()
  const [productoDetalle, setProductoDetalle] = useState(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
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

  if (!productoDetalle) return <p>Cargando...</p>

  return (
    <main className="detalle">
      <div className="detalle-imagen">
        <img src={productoDetalle.imagen} alt={productoDetalle.nombre} />
      </div>
      <div className="detalle-info">
        <h2>{productoDetalle.nombre}</h2>
        <p>{productoDetalle.precio}</p>
        <p>{productoDetalle.categoria}</p>
        <p>{productoDetalle.descripcion}</p>
        <button onClick={() => agregarAlCarrito(productoDetalle)}>Agregar al carrito</button>
        <button onClick={() => navigate('/productos')}>Volver al Catálogo</button>
      </div>
    </main>
  )
}

export default ProductDetail