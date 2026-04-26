const MOCK_PRODUCTS = [
  {
    id: 1,
    sku: "PET-001",
    name: "Cuenco de Comida Premium",
    description: "Cuenco de acero inoxidable resistente y fácil de limpiar. Ideal para perros y gatos de cualquier tamaño.",
    price: 8500,
    stock: 25,
    category: "Accesorios",
    image_url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
    is_active: true
  },
  {
    id: 2,
    sku: "PET-002",
    name: "Correa de Cuero Resistente",
    description: "Correa de cuero genuino con hebilla metálica. Cómoda para el dueño y segura para la mascota.",
    price: 12000,
    stock: 15,
    category: "Accesorios",
    image_url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
    is_active: true
  },
  {
    id: 3,
    sku: "PET-003",
    name: "Juguete Ratón para Gatos",
    description: "Juguete interactivo con sonido para mantener a tu gato entretenido por horas.",
    price: 3500,
    stock: 3,
    category: "Juguetes",
    image_url: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400",
    is_active: true
  },
  {
    id: 4,
    sku: "PET-004",
    name: "Cama Suave para Mascotas",
    description: "Cama acolchada ultra suave para el descanso de tu mascota. Lavable a máquina.",
    price: 25000,
    stock: 10,
    category: "Mobiliario",
    image_url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400",
    is_active: true
  },
  {
    id: 5,
    sku: "PET-005",
    name: "Alimento Seco para Perros",
    description: "Alimento balanceado con proteínas naturales para perros adultos. Bolsa de 5kg.",
    price: 18000,
    stock: 50,
    category: "Alimentos",
    image_url: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
    is_active: true
  },
  {
    id: 6,
    sku: "PET-006",
    name: "Rascador Grande para Gatos",
    description: "Rascador de sisal con plataformas y juguetes colgantes. Perfecto para gatos activos.",
    price: 30000,
    stock: 8,
    category: "Mobiliario",
    image_url: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400",
    is_active: true
  },
  {
    id: 7,
    sku: "PET-007",
    name: "Shampoo para Mascotas",
    description: "Shampoo hipoalergénico con aloe vera. Suave para la piel y el pelaje de tu mascota.",
    price: 6500,
    stock: 0,
    category: "Cuidado",
    image_url: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400",
    is_active: true
  },
  {
    id: 8,
    sku: "PET-008",
    name: "Collar Ajustable de Cuero",
    description: "Collar de cuero genuino con hebilla de acero. Disponible en varios tamaños.",
    price: 9000,
    stock: 20,
    category: "Accesorios",
    image_url: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=400",
    is_active: true
  }
];

const MOCK_USERS = {
  admin: {
    id: 1,
    email: "admin@lyfter.com",
    password: "admin1234",
    name: "Administrador",
    role: "admin"
  },
  cliente: {
    id: 2,
    email: "cliente@lyfter.com",
    password: "cliente1234",
    name: "Cliente Demo",
    role: "cliente"
  }
};