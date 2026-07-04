import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getProductById, updateProduct } from '../services/api'

function EditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { usuario } = useApp()
  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', stock: ''
  })
  const [noEncontrado, setNoEncontrado] = useState(false)

  useEffect(() => {
    getProductById(id).then(({ data, ok }) => {
      if (!ok || !data.data) {
        setNoEncontrado(true)
        return
      }
      const p = data.data
      setForm({
        id: p.id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        categoria: p.category,
        imagen: p.image_url || '',
        stock: p.stock
      })
    })
  }, [id])

  const handleGuardar = async () => {
    if (!form.nombre || !form.descripcion || !form.precio || !form.categoria || !form.stock) {
      alert('Por favor completa todos los campos.')
      return
    }
    const { ok } = await updateProduct(id, {
      name: form.nombre, description: form.descripcion,
      price: form.precio, category: form.categoria,
      stock: form.stock, is_active: true
    }, usuario.token)
    if (ok) {
      navigate('/admin')
    } else {
      alert('Error al guardar los cambios.')
    }
  }

  if (noEncontrado) return (
    <main>
      <h1>Producto no encontrado</h1>
      <p>El producto que intentás editar no existe.</p>
      <Link to="/admin">Volver al panel de administración</Link>
    </main>
  )

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
        <button type="button" onClick={handleGuardar}>Guardar cambios</button>
        <button type="button" onClick={() => navigate('/admin')}>Cancelar</button>
      </form>
    </main>
  )
}

export default EditarProducto