import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Página no encontrada</h1>
      <p>La página que estás buscando no existe o ha sido movida.</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </main>
  )
}

export default NotFoundPage