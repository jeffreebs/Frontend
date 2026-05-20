import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

function CatalogPage({setPagina, setProducto}) {
    console.log(products)
    return (
      <main>
        <h1>Catálogo de productos</h1>
        <div className="catalogo-grid">
          {products.length === 0 
            ? <p>No hay productos disponibles por el momento.</p>
            : products.map(producto => (
              <ProductCard key= {producto.id} producto= {producto} setPagina={setPagina} setProducto={setProducto}/>
              ))
          }
        </div>
      </main>
    )
  }

export default CatalogPage