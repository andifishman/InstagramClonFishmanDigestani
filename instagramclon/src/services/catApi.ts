import axios from 'axios'

interface CatImage {
  id: string
  url: string
  width: number
  height: number
}

const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1/images/search'

const fetchCatImages = async (quantity: number = 15): Promise<CatImage[]> => {
  const response = await axios.get<CatImage[]>(CAT_API_BASE_URL, {
    params: {
      limit: quantity,
      size: 'med', // 'med' balancea calidad y velocidad de carga
    },
  })
  return response.data
}

export { fetchCatImages }
export type { CatImage }
