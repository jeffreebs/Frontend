import { useState, useEffect} from 'react'

function ProductDetail({ producto, setPagina, usuario }) {
  const [productoDetalle, setProductoDetalle] = useState (producto)


  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${producto.id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Detalle del backend:', data)
        const p = data.data
        setProductoDetalle({
          id: p.id,
          nombre: p.name,
          precio: p.price,
          categoria: p.category,
          imagen: p.image_url || `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(p.name)}`,
          descripcion: p.description,
          stock: p.stock
        })
      })
  }, [producto.id])


  return (
    <main className="detalle">
      <div className="detalle-imagen">
        <img src={productoDetalle.imagen} alt={productoDetalle.nombre} />
      </div>
      <div className="detalle-info">
        <h2> {productoDetalle.nombre} </h2>
        <p> {productoDetalle.precio} </p>
        <p> {productoDetalle.categoria} </p>
        <p> {productoDetalle.descripcion} </p>
        <p>Más adelante aquí se podrá agregar este producto al carrito y completar la compra.</p>
        <button onClick={ ()=>{
        setPagina("catalogo")
      }} >Volver al Catálogo</button>
      </div>
      
    </main>
  )
}

export default ProductDetail