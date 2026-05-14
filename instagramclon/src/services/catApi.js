import axios from 'axios'

const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1/images/search'

const fetchCatImages = async (quantity = 15) => {
  const response = await axios.get(CAT_API_BASE_URL, {
    params: {
      limit: quantity,
      size: 'med', // 'med' balancea calidad y velocidad de carga
    },
  })
  return response.data
}

export { fetchCatImages }
