import '../App.css'


function Header( {setPagina, paginaActual} ) {
  return (
    <header>
        <h1>PawStore</h1>
        <nav>
            <ul>
               <li><button  className={paginaActual === 'inicio' ? 'activo' : ''} onClick={() => setPagina('inicio')}>Inicio</button></li>
               <li><button  className={paginaActual === 'catalogo' || paginaActual === 'detalle' ? 'activo' : ''} onClick={() => setPagina('catalogo')}>Productos</button></li>
               <li><button  className={paginaActual === 'contacto' ? 'activo' : ''} onClick={() => setPagina('contacto')}>Contacto</button></li>
               <li><button  className={paginaActual === 'admin' ? 'activo' : ''} onClick={() => setPagina('admin')}>Administración</button></li>
                
            </ul>
        </nav>
    </header>
     
  )
}

export default Header