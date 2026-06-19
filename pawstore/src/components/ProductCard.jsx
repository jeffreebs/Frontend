function ProductCard({ producto, setPagina, setProducto }) {
  return (
    <div className="tarjeta">
      <img src={producto.imagen} alt={producto.nombre} />
      <h2> {producto.nombre} </h2>
      <p> {producto.precio} </p>
      <p> {producto.categoria} </p>
      <button onClick={ ()=>{
        setProducto(producto)
        setPagina("detalle")
      }} >Ver Detalles</button>
    </div>
  )
}

export default ProductCard