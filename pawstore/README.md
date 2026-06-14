# PawStore

Tienda en línea de productos para mascotas. Proyecto desarrollado con Vite + React.

## Requisitos

- Node.js instalado
- Python 3.8+
- PostgreSQL 12+

## Instalación del Frontend

1. Clonar el repositorio
2. Entrar a la carpeta del proyecto
3. Ejecutar:

```bash
npm install
```

## Cómo correr el Frontend

```bash
npm run dev
```

Luego abrir el navegador en `http://localhost:5173`

## Backend

El frontend consume una API REST desarrollada en Flask + PostgreSQL.

### Ubicación
El backend se encuentra en la carpeta `ProyectoTienda` o en el repositorio correspondiente.

### Cómo iniciar el backend

```bash
cd ProyectoTienda
pip install -r requirements.txt
python main.py
```

El backend debe estar corriendo en `http://127.0.0.1:5000` antes de abrir el frontend.

### Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/login` | Iniciar sesión |
| POST | `/register` | Registrar usuario |
| GET | `/products` | Listar productos |
| POST | `/products` | Crear producto (admin) |
| PUT | `/products/<id>` | Editar producto (admin) |
| DELETE | `/products/<id>` | Eliminar producto (admin) |

### Usuarios de prueba

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@pawstore.com | admin123 | admin |

## Vistas

- **Inicio** — página de bienvenida
- **Catálogo** — listado de productos desde el backend
- **Detalle** — información completa de un producto
- **Administración** — gestión de productos (solo admin)
- **Login** — inicio de sesión

## Tecnologías

- Vite + React
- JSX + componentes funcionales
- useState y useEffect
- fetch para llamadas HTTP
- JWT para autenticación