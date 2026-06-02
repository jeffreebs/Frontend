import { useState } from "react"

function EditarProducto( {producto, editarProducto, setPagina} ) {

    const [form, setForm] = useState(producto)

    const handleGuardar = () => {
        if (!form.nombre || !form.descripcion || !form.precio || !form.categoria || !form.imagen || !form.stock) {
            alert('Por favor completa todos los campos antes de guardar los cambios.')
            return
        }

        editarProducto(form)
        setPagina('admin')
    }
  return (

    
    <main className="editar">
        <h1>Editar producto</h1>
        <form>
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />

            <label htmlFor="descripcion">Descripción</label>
            <input id="descripcion" value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})} />

            <label htmlFor="precio">Precio</label>
            <input id="precio" value={form.precio} onChange={(e) => setForm({...form, precio: e.target.value})} />

            <label htmlFor="categoria">Categoría</label>
            <input id="categoria" value={form.categoria} onChange={(e) => setForm({...form, categoria: e.target.value})} />

            <label htmlFor="imagen">URL de la imagen</label>
            <input id="imagen" value={form.imagen} onChange={(e) => setForm({...form, imagen: e.target.value})} />

            <label htmlFor="stock">Stock</label>
            <input id="stock" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} />

            <button onClick={handleGuardar}>Guardar cambios</button>
            <button onClick={() => setPagina('admin')}>Cancelar</button>
        </form>
      
    </main>
     
  )
}

export default EditarProducto