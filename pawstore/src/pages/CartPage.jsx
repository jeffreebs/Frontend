import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { formatearPrecio } from '../utils/formato'

function CartPage() {
  const { carrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito } = useApp()

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)

  if (carrito.length === 0) {
    return (
      <main>
        <h1>Carrito de compras</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos">Ver productos</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>Carrito de compras</h1>
      {carrito.map(item => (
        <div key={item.id}>
          <p>{item.nombre}</p>
          <p>Precio: {formatearPrecio(item.precio)}</p>
          <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>-</button>
          <span>{item.cantidad}</span>
          <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
          <p>Subtotal: {formatearPrecio(item.precio * item.cantidad)}</p>
          <button onClick={() => quitarDelCarrito(item.id)}>Quitar</button>
        </div>
      ))}
      <p>Total: {formatearPrecio(total)}</p>
      <button onClick={vaciarCarrito}>Vaciar carrito</button>
      <Link to="/checkout">Ir al checkout</Link>
    </main>
  )
}

export default CartPage