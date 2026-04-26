# 🐾 Lyfter Pet Store — Frontend

Aplicación web de e-commerce para una tienda de mascotas, desarrollada como proyecto final del Módulo 2 (Frontend). Permite a los clientes explorar productos, gestionar su carrito y realizar compras, mientras que los administradores pueden gestionar el catálogo en tiempo real.

---

##  Tecnologías utilizadas

- **HTML5** — Estructura semántica
- **CSS3** — Flexbox y CSS Grid, unidades relativas (rem, em, %, vh, vw)
- **JavaScript Vanilla** — Lógica del cliente, Fetch API
- **localStorage** — Persistencia de sesión y carrito de compras

---

## 📁 Estructura del proyecto

---

## ▶️ Cómo ejecutar el proyecto

### Opción A — Con mock data (sin backend)

1. Cloná el repositorio:
```bash
git clone https://github.com/tu-usuario/lyfter-pet-store.git
cd lyfter-pet-store
```

2. Abrí `index.html` con **Live Server** en VS Code.

3. Usá estas credenciales de prueba:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@lyfter.com | admin1234 |
| Cliente | cliente@lyfter.com | cliente1234 |

> El mock está activo por defecto. No requiere backend ni base de datos.

---

### Opción B — Conectado al backend real (Flask)

#### 1. Requisitos previos
- Python 3.10+
- PostgreSQL 14+
- Redis (o cuenta en RedisLabs)

#### 2. Configurar el backend

```bash
# Clona o ubica el proyecto backend
cd pet-shop-backend

# Crea y activa el entorno virtual
python -m venv venv
source venv/bin/activate        # Linux/Mac
venv\Scripts\activate           # Windows

# Instalá dependencias
pip install -r requirements.txt
```

#### 3. Configurar variables de entorno

Creá un archivo `.env` en la raíz del backend:

```env
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=petshop_db

REDIS_HOST=tu_redis_host
REDIS_PORT=tu_redis_port
REDIS_PASSWORD=tu_redis_password
REDIS_USER=default

SECRET_KEY=tu_clave_secreta
TOKEN_TTL_SECONDS=86400
```

#### 4. Crear la base de datos

```bash
# En PostgreSQL
psql -U postgres
CREATE DATABASE petshop_db;
\q

# Correr el schema y el seed
psql -U postgres -d petshop_db -f database_schema.sql
psql -U postgres -d petshop_db -f database_seed.sql
```

#### 5. Levantar el servidor Flask

```bash
python main.py
# El servidor corre en http://localhost:5000
```

#### 6. Conectar el frontend

Abrí `js/api/config.js` y cambiá esta línea:

```js
const USE_MOCK = false; 
```

Guardá y recargá el browser. ¡Listo!

---

## 🔌 Endpoints del backend

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/register` | ❌ | Registro de usuario |
| POST | `/login` | ❌ | Login, retorna token |
| GET | `/products` | ✅ | Listar productos |
| GET | `/products/:id` | ✅ | Producto por ID |
| POST | `/products` | 🔐 Admin | Crear producto |
| PUT | `/products/:id` | 🔐 Admin | Actualizar producto |
| DELETE | `/products/:id` | 🔐 Admin | Eliminar producto |
| POST | `/carts` | ✅ Cliente | Crear carrito |
| GET | `/carts/:id` | ✅ | Ver carrito |
| POST | `/carts/:id/items` | ✅ Cliente | Agregar item |
| PUT | `/carts/:id/items/:itemId` | ✅ Cliente | Actualizar item |
| DELETE | `/carts/:id/items/:itemId` | ✅ Cliente | Eliminar item |
| POST | `/checkout` | ✅ Cliente | Procesar compra |
| GET | `/bills` | 🔐 Admin | Ver todas las ventas |

---

## 🏗️ Decisiones técnicas

### Separación de capas
La lógica se dividió en tres capas claras:
- **`js/api/`** — Solo maneja peticiones HTTP, nunca toca el DOM
- **`js/utils/`** — Funciones reutilizables (sesión, validación, UI)
- **`js/pages/`** — Controladores que conectan la API con el DOM

Esto cumple el requerimiento de modularidad y facilita el mantenimiento.

### Sistema de autenticación
El backend usa `itsdangerous` en lugar de JWT clásico. El token se envía en cada request como `Authorization: Bearer <token>`. El rol del usuario se detecta intentando acceder a `GET /bills` — si responde 200 es admin, si responde 403 es cliente.

### Modo mock
Se implementó un sistema de mock data en `config.js` controlado por la variable `USE_MOCK`. Permite desarrollar y probar el frontend de forma independiente al backend. Para conectar al backend real solo se cambia `USE_MOCK = false`.

### Persistencia del carrito
El carrito se persiste en localStorage con las keys `cart_id` y `cart_items`. Esto permite que el usuario cierre el browser y encuentre su carrito intacto al volver.

### Detección de stock bajo
Los productos con stock menor o igual a 5 muestran una advertencia visual en rojo — implementado en `catalog.js` con la clase CSS `product-card__stock--low`.


