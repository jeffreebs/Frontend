import { Link, useLocation, Navigate } from 'react-router-dom'

function ConfirmacionPage() {
  const location = useLocation()

  if (!location.state?.compraExitosa) {
    return <Navigate to="/" />
  }

  return (
    <main>
      <h1>¡Gracias por tu compra!</h1>
      <p>Hemos enviado un correo de confirmación con los detalles de tu pedido.</p>
      <Link to="/productos">Volver al catálogo</Link>
    </main>
  )
}

export default ConfirmacionPage