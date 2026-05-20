import '../App.css'


function Header( {setPagina, paginaActual} ) {
  return (
    <header>
        <h1>PawStore</h1>
        <nav>
            <ul>
               <li><a href="#" className={paginaActual === 'inicio' ? 'activo' : ''} onClick={() => setPagina('inicio')}>Inicio</a></li>
               <li><a href="#" className={paginaActual === 'catalogo' ? 'activo' : ''} onClick={() => setPagina('catalogo')}>Catalogo</a></li>
               <li><a href="#" className={paginaActual === 'contacto' ? 'activo' : ''} onClick={() => setPagina('contacto')}>Contacto</a></li>
                
            </ul>
        </nav>
    </header>
     
  )
}

export default Header