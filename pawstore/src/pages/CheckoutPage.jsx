import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function CheckoutPage() {
  const { carrito, vaciarCarrito, usuario } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    direccion: ''
  })
  const [error, setError] = useState('')

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)

  const handleConfirmar = async () => {
    if (!form.nombre || !form.email || !form.direccion) {
      setError('Por favor completa todos los campos.')
      return
    }

    try {
      const cartRes = await fetch('http://127.0.0.1:5000/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario?.token}`
        },
        body: JSON.stringify({ user_id: usuario?.id })
      })
      const cartData = await cartRes.json()
      const cart_id = cartData.cart_id

      for (const item of carrito) {
        await fetch(`http://127.0.0.1:5000/carts/${cart_id}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario?.token}`
          },
          body: JSON.stringify({
            product_id: item.id,
            quantity: item.cantidad
          })
        })
      }

      const response = await fetch('http://127.0.0.1:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario?.token}`
        },
        body: JSON.stringify({
          cart_id: cart_id,
          user_id: usuario?.id,
          billing_info: {
            billing_name: form.nombre,
            billing_address: form.direccion,
            billing_tax_id: form.email
          }
        })
      })
      const data = await response.json()
      

      if (response.ok) {
        vaciarCarrito()
        navigate('/confirmacion')
      } else {
        setError('Ocurrió un problema al procesar tu compra. Por favor intenta de nuevo.')
      }
    } catch {
      setError('Ocurrió un problema al procesar tu compra. Por favor intenta de nuevo.')
    }
  }

  return (
    <main>
      <h1>Checkout</h1>
      <p>Revisa los detalles de tu compra y completa la información necesaria para finalizar el pedido.</p>
      <h2>Resumen de la compra</h2>
      {carrito.map(item => (
        <div key={item.id}>
          <p>{item.nombre} x{item.cantidad} — {item.precio * item.cantidad}</p>
        </div>
      ))}
      <p>Total: {total}</p>
      <h2>Información de envío</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <label>Nombre completo</label>
      <input value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
      <label>Correo electrónico</label>
      <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
      <label>Dirección de envío</label>
      <input value={form.direccion} onChange={(e) => setForm({...form, direccion: e.target.value})} />
      <button onClick={handleConfirmar}>Confirmar compra</button>
      <button onClick={() => navigate('/carrito')}>Cancelar</button>
    </main>
  )
}

export default CheckoutPage