import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function CatalogPage() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(res => res.json())
      .then(data => {
        const normalized = data.data.map(p => ({
          id: p.id,
          nombre: p.name,
          precio: p.price,
          categoria: p.category,
          imagen: p.image_url || `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(p.name)}`,
          descripcion: p.description,
          stock: p.stock
        }))
        setProducts(normalized)
      })
  }, [])

  return (
    <main>
      <h1>Catálogo de productos</h1>
      <div className="catalogo-grid">
        {products.length === 0
          ? <p>No hay productos disponibles por el momento.</p>
          : products.map(producto => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
              onClick={() => navigate(`/productos/${producto.id}`)}
            />
          ))
        }
      </div>
    </main>
  )
}

export default CatalogPage