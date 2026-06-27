import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import '../App.css'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { usuario, setUsuario, carrito } = useApp()

  const cerrarSesion = () => {
    setUsuario(null)
    navigate('/')
  }

  return (
    <header>
      <h1>PawStore</h1>
      <nav>
        <ul>
          <li><button className={location.pathname === '/' ? 'activo' : ''} onClick={() => navigate('/')}>Inicio</button></li>
          <li><button className={location.pathname.startsWith('/productos') ? 'activo' : ''} onClick={() => navigate('/productos')}>Productos</button></li>
          <li><button className={location.pathname === '/contacto' ? 'activo' : ''} onClick={() => navigate('/contacto')}>Contacto</button></li>
          <li><button className={location.pathname === '/admin' ? 'activo' : ''} onClick={() => navigate('/admin')}>Administración</button></li>
          <li>
            <button onClick={() => navigate('/carrito')}>
              Carrito {carrito.length > 0 && `(${carrito.length})`}
            </button>
          </li>
          {usuario
            ? <li><span>Sesión iniciada como: {usuario.nombre}</span> <button onClick={cerrarSesion}>Cerrar sesión</button></li>
            : <li><button className={location.pathname === '/login' ? 'activo' : ''} onClick={() => navigate('/login')}>Iniciar sesión</button></li>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header