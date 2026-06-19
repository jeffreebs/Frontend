import '../App.css'


function Header( {setPagina, paginaActual, usuario, setUsuario} ) {
  return (
    <header>
        <h1>PawStore</h1>
        <nav>
            <ul>
               <li><button  className={paginaActual === 'inicio' ? 'activo' : ''} onClick={() => setPagina('inicio')}>Inicio</button></li>
               <li><button  className={paginaActual === 'catalogo' || paginaActual === 'detalle' ? 'activo' : ''} onClick={() => setPagina('catalogo')}>Productos</button></li>
               <li><button  className={paginaActual === 'contacto' ? 'activo' : ''} onClick={() => setPagina('contacto')}>Contacto</button></li>
               <li><button  className={paginaActual === 'admin' ? 'activo' : ''} onClick={() => setPagina('admin')}>Administración</button></li>
               {usuario 
                  ? <li><span>Sesión iniciada como: {usuario.nombre}</span> <button onClick={() => { setUsuario(null); setPagina('inicio') }}>Cerrar sesión</button></li>
                  : <li><button className={paginaActual === 'login' ? 'activo' : ''} onClick={() => setPagina('login')}>Iniciar sesión</button></li>
                } 
            </ul>
        </nav>
        
    </header>
     
  )
}

export default Header