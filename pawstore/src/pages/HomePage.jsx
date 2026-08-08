import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="home">
      <h1>Bienvenido a PawStore</h1>
      <p>Somos una tienda dedicada a ofrecer productos de calidad para tus mascotas.</p>
      <p>Explora nuestro catálogo para encontrar camas, juguetes, accesorios y más.</p>
      <Link to="/productos">Ver Productos</Link>
    </main>
  )
}

export default HomePage