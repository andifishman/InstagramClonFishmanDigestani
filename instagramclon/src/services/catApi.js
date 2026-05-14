// catApi.js — Servicio de conexión con The Cat API
// Este archivo centraliza todas las llamadas HTTP relacionadas con cats.
// Usamos Axios porque simplifica las peticiones fetch y el manejo de errores.
// Separar la lógica de API en su propio archivo es una buena práctica:
// si necesitamos cambiar la API, solo modificamos este archivo.

import axios from 'axios'

// URL base de The Cat API
// Es una API pública gratuita que devuelve imágenes reales de cats
// Documentación: https://developers.thecatapi.com/
const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1/images/search'

// ─────────────────────────────────────────────────────────────────────
// fetchCatImages — Obtiene múltiples imágenes de cats desde la API
//
// Parámetro:
//   quantity (número) — cuántas imágenes queremos obtener (por defecto 15)
//
// Retorna:
//   Un array de objetos, donde cada objeto tiene la forma:
//   { id: "abc123", url: "https://...", width: 1200, height: 800 }
//
// Esta función es async porque hace una petición HTTP que puede tardar.
// Usamos async/await para que el código sea más legible que con .then()
// ─────────────────────────────────────────────────────────────────────
const fetchCatImages = async (quantity = 15) => {
  // axios.get() hace una petición HTTP GET a la URL indicada
  // El segundo argumento es la configuración de la petición
  const response = await axios.get(CAT_API_BASE_URL, {
    params: {
      // 'limit' le dice a la API cuántas imágenes devolver en una sola respuesta
      limit: quantity,
      // 'size' indica el tamaño de las imágenes: 'small', 'med', 'full'
      // Usamos 'med' para un balance entre calidad y velocidad de carga
      size: 'med',
    },
  })

  // response.data contiene el array de imágenes que devolvió la API
  // Ejemplo de un elemento: { id: "abc", url: "https://cdn2.thecatapi.com/...", width: 600, height: 400 }
  return response.data
}

export { fetchCatImages }
