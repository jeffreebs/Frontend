import {useState} from 'react'

function LoginPage( {setUsuario, setPagina} ) {
    const [form, setForm] = useState({
        email: '',
        password: ''
        })

    const handleLogin = async () => {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        const data = await response.json()
        console.log(data)
        
        if (response.ok) {
            setUsuario({ nombre: data.name, rol: data.role, token: data.token })
            setPagina('catalogo')
        } else {
            alert('Las credenciales proporcionadas no son válidas. Por favor verifica tu correo y contraseña.')
        }
    }
    return (
      <main>
        <h1>Iniciar sesión</h1>
        <form>
            <label>Correo electrónico</label>
            <input 
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value})} 
            />
            <label>Contraseña</label>
            <input 
            type="password"
            value={form.password} 
            onChange={(e) => setForm({...form, password: e.target.value})} 
            />
            <button type="button" onClick={handleLogin}>Ingresar</button>
        </form>
      </main>
    )
  }

export default LoginPage