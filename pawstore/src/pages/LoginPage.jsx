import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { login } from '../services/api'
import { useApp } from '../context/AppContext'

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { usuario, setUsuario } = useApp()
  const navigate = useNavigate()

  if (usuario) {
    return <Navigate to="/" />
  }

  const handleLogin = async () => {
    const { data, ok } = await login(form)
    if (ok) {
      setUsuario({ nombre: data.name, rol: data.role, token: data.token, id: data.user_id })
      if (data.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/productos')
      }
    } else {
      setError('Las credenciales proporcionadas no son válidas. Por favor verifica tu correo y contraseña.')
    }
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form>
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
        <button type="button" onClick={handleLogin}>Ingresar</button>
      </form>
    </main>
  )
}

export default LoginPage