import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

function CatalogPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProducts().then(data => {
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
      setLoading(false)
    })
  }, [])

  return (
    <main>
      <h1>Catálogo de productos</h1>
      {loading
        ? <p>Cargando productos...</p>
        : <div className="catalogo-grid">
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
      }
    </main>
  )
}

export default CatalogPage