function ProductDetail({ producto, setPagina, setProducto }) {
  return (
    <main>
      <img src={producto.imagen} alt={producto.nombre} />
      <h2> {producto.nombre} </h2>
      <p> {producto.precio} </p>
      <p> {producto.categoria} </p>
      <p> {producto.descripcion} </p>
      <p>Más adelante aquí se podrá agregar este producto al carrito y completar la compra.</p>
      <button onClick={ ()=>{
        setPagina("catalogo")
      }} >Volver al Catálogo</button>
    </main>
  )
}

export default ProductDetail