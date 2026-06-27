import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApp } from './context/AppContext'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetail from './components/ProductDetail'
import AdminPage from './pages/AdminPage'
import EditarProducto from './pages/EditarProducto'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmacionPage from './pages/ConfirmacionPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'


function App() {
  const { usuario } = useApp()

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/confirmacion" element={<ConfirmacionPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<CatalogPage />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          !usuario
            ? <main><p>Debes iniciar sesión para acceder a esta sección.</p></main>
            : usuario.rol === 'admin'
              ? <AdminPage />
              : <main><p>No tienes permiso para acceder a esta sección.</p></main>
        } />
        <Route path="/admin/editar/:id" element={
          usuario && usuario.rol === 'admin'
            ? <EditarProducto />
            : <main><p>No tienes permiso para acceder a esta sección.</p></main>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App