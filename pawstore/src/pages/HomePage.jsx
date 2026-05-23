function HomePage( {setPagina} ) {
  return (

    
    <main className="home">
      
        <h1>Bienvenido a PawStore</h1>
        <p>Somos una tienda dedicada a ofrecer productos de calidad para tus mascotas.</p>
        <p>Explora nuestro catálogo para encontrar camas, juguetes, accesorios y más.</p>
        <button  onClick= {() => setPagina('catalogo') } >Ver Productos</button>
        <p>"Esta es la página principal de la aplicación. Más adelante aquí se podrán mostrar productos destacados.</p>
    </main>
     
  )
}

export default HomePage