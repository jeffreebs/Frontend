import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function CartPage() {
  const { carrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito } = useApp()
  const navigate = useNavigate()

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)

  if (carrito.length === 0) {
    return (
      <main>
        <h1>Carrito de compras</h1>
        <p>Tu carrito está vacío.</p>
        <button onClick={() => navigate('/productos')}>Ver productos</button>
      </main>
    )
  }

  return (
    <main>
      <h1>Carrito de compras</h1>
      {carrito.map(item => (
        <div key={item.id}>
          <p>{item.nombre}</p>
          <p>Precio: {item.precio}</p>
          <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>-</button>
          <span>{item.cantidad}</span>
          <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
          <p>Subtotal: {item.precio * item.cantidad}</p>
          <button onClick={() => quitarDelCarrito(item.id)}>Quitar</button>
        </div>
      ))}
      <p>Total: {total}</p>
      <button onClick={vaciarCarrito}>Vaciar carrito</button>
      <button onClick={() => navigate('/checkout')}>Ir al checkout</button>
    </main>
  )
}

export default CartPage