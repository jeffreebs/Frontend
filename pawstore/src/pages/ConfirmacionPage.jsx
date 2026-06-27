import { useNavigate } from 'react-router-dom'

function ConfirmacionPage() {
  const navigate = useNavigate()

  return (
    <main>
      <h1>¡Gracias por tu compra!</h1>
      <p>Hemos enviado un correo de confirmación con los detalles de tu pedido.</p>
      <button onClick={() => navigate('/productos')}>Volver al catálogo</button>
    </main>
  )
}

export default ConfirmacionPage