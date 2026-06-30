import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'

function ProductCard({ producto }) {
  return (
    <div className="tarjeta">
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>{formatearPrecio(producto.precio)}</p>
      <p>{producto.categoria}</p>
      <Link to={`/productos/${producto.id}`}>Ver Detalles</Link>
    </div>
  )
}

export default ProductCard