import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main>
      <h1>Página no encontrada</h1>
      <p>La página que estás buscando no existe o ha sido movida.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}

export default NotFoundPage