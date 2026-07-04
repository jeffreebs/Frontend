import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { createCart, addCartItem, checkout } from '../services/api'
import { formatearPrecio } from '../utils/formato'


function CheckoutPage() {
  const { carrito, vaciarCarrito, usuario } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', direccion: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!usuario) {
      navigate('/login')
      return
    }
    if (carrito.length === 0) {
      navigate('/carrito')
    }
  }, [usuario, carrito])

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)

  const handleConfirmar = async () => {
    if (!form.nombre || !form.email || !form.direccion) {
      setError('Por favor completa todos los campos.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data: cartData, ok: cartOk } = await createCart(usuario?.id, usuario?.token)
  if (!cartOk) {
    setError('Ocurrió un problema al procesar tu compra. Por favor intenta de nuevo.')
    setLoading(false)
    return
  }
  const cart_id = cartData.cart_id

  for (const item of carrito) {
    const { ok: itemOk } = await addCartItem(cart_id, { product_id: item.id, quantity: item.cantidad }, usuario?.token)
    if (!itemOk) {
      setError('Ocurrió un problema al procesar tu compra. Por favor intenta de nuevo.')
      setLoading(false)
      return
    }
  }

  const { ok: checkoutOk } = await checkout({
    cart_id: cart_id,
    user_id: usuario?.id,
    billing_info: {
      billing_name: form.nombre,
      billing_address: form.direccion,
      billing_tax_id: form.email,
      billing_email: form.email
    }
  }, usuario?.token)

      if (checkoutOk) {
        vaciarCarrito()
        navigate('/confirmacion', { state: { compraExitosa: true } })
      } else {
        setError('Ocurrió un problema al procesar tu compra. Por favor intenta de nuevo.')
      }
    } catch {
      setError('Ocurrió un problema al procesar tu compra. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Checkout</h1>
      <p>Revisa los detalles de tu compra y completa la información necesaria para finalizar el pedido.</p>
      <h2>Resumen de la compra</h2>
      {carrito.map(item => (
        <div key={item.id}>
          <p>{item.nombre} — Precio unitario: {formatearPrecio(item.precio)} x{item.cantidad} — Subtotal: {formatearPrecio(item.precio * item.cantidad)}</p>
        </div>
      ))}
      <p>Total: {formatearPrecio(total)}</p>
      <h2>Información de envío</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <label htmlFor="nombre">Nombre completo</label>
      <input id="nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
      <label htmlFor="email">Correo electrónico</label>
      <input id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
      <label htmlFor="direccion">Dirección de envío</label>
      <input id="direccion" value={form.direccion} onChange={(e) => setForm({...form, direccion: e.target.value})} />
      <button onClick={handleConfirmar} disabled={loading}>
        {loading ? 'Procesando...' : 'Confirmar compra'}
      </button>
      <button onClick={() => navigate('/carrito')} disabled={loading}>Cancelar</button>
    </main>
  )
}

export default CheckoutPage