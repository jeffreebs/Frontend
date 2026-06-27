import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="home">
      <h1>Bienvenido a PawStore</h1>
      <p>Somos una tienda dedicada a ofrecer productos de calidad para tus mascotas.</p>
      <p>Explora nuestro catálogo para encontrar camas, juguetes, accesorios y más.</p>
      <button onClick={() => navigate('/productos')}>Ver Productos</button>
    </main>
  )
}

export default HomePage