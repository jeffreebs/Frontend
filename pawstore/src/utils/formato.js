export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC'
  }).format(precio)
}