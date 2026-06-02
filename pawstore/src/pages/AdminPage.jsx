import { useState } from "react"


function AdminPage( {products, eliminarProducto, agregarProducto, setPagina, setProductoSeleccionado} ) {
    const [nuevoProducto, setNuevoProducto] = useState({
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
  imagen: '',
  stock: ''
})

const handleAgregar = () => {
  if (!nuevoProducto.nombre || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.categoria || !nuevoProducto.imagen || !nuevoProducto.stock) {
    alert('Por favor completa todos los campos antes de agregar el producto.')
    return
  }
  agregarProducto(nuevoProducto)
  setNuevoProducto({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', stock: '' })
}
  return (
    <main>
      <h1>Administración de productos</h1>
      <p>En estasección puedes gestionar el catálogo de productos de PawStore</p>

      <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {products.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>
                <button onClick={() => {
                  setProductoSeleccionado(producto)
                  setPagina('editar')
                }}>Editar</button>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
     </table>
     <div>
        <h2>Agregar nuevo producto</h2>
        <label>Nombre</label>
        <input value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} />
        <label>Descripcion</label>
        <input value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({...nuevoProducto, descripcion: e.target.value})} />
        <label>Precio</label>
        <input value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})} />
        <label>Categoría</label>
        <input value={nuevoProducto.categoria} onChange={(e) => setNuevoProducto({...nuevoProducto, categoria: e.target.value})} />
        <label>URL de la imagen</label>
        <input value={nuevoProducto.imagen} onChange={(e) => setNuevoProducto({...nuevoProducto, imagen: e.target.value})} />
        <label>Stock</label>
        <input value={nuevoProducto.stock} onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})} />
        <button onClick={ handleAgregar}>Agregar Producto</button>
    </div>
    </main>

    
  )
}

export default AdminPage