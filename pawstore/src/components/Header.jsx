import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import '../App.css'

function Header() {
  const navigate = useNavigate()
  const { usuario, setUsuario, carrito } = useApp()
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0)

  const cerrarSesion = () => {
    setUsuario(null)
    navigate('/')
  }

  return (
    <header>
      <h1>PawStore</h1>
      <nav>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'activo' : ''}>Inicio</NavLink></li>
          <li><NavLink to="/productos" className={({ isActive }) => isActive ? 'activo' : ''}>Productos</NavLink></li>
          <li><NavLink to="/contacto" className={({ isActive }) => isActive ? 'activo' : ''}>Contacto</NavLink></li>
          <li><NavLink to="/admin" className={({ isActive }) => isActive ? 'activo' : ''}>Administración</NavLink></li>
          <li>
            <NavLink to="/carrito" className={({ isActive }) => isActive ? 'activo' : ''}>
              Carrito {totalItems > 0 && `(${totalItems})`}
            </NavLink>
          </li>
          {usuario
            ? <li><span>Sesión iniciada como: {usuario.nombre}</span> <button onClick={cerrarSesion}>Cerrar sesión</button></li>
            : <li><NavLink to="/login" className={({ isActive }) => isActive ? 'activo' : ''}>Iniciar sesión</NavLink></li>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header