import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p => p.id === producto.id 
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const quitarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id))
  }

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return
    setCarrito(prev => prev.map(p => p.id === id ? { ...p, cantidad } : p))
  }

  const vaciarCarrito = () => setCarrito([])

  return (
    <AppContext.Provider value={{ 
      usuario, setUsuario, 
      carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito 
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}