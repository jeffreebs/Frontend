import { useNavigate } from 'react-router-dom'

function ProductCard({ producto }) {
  const navigate = useNavigate()

  return (
    <div className="tarjeta">
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>{producto.precio}</p>
      <p>{producto.categoria}</p>
      <button onClick={() => navigate(`/productos/${producto.id}`)}>Ver Detalles</button>
    </div>
  )
}

export default ProductCard