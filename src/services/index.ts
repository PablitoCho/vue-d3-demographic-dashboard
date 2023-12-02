import axios from 'axios'

// api calls
export interface BirthRate {
  date: string
  region: string
  birth_rate: number
}

export interface DemographicValue {
  region: string
  type: 'Birth' | 'Death' | 'Diverce' | 'Marriage'
  value: number
}

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000'
})

const getBirthRatesByRegion = async <T = BirthRate[]>(region: String): Promise<T> => {
  const { data } = await axiosClient.get<T>(`/getBirthRates?region=${region}`)
  return data
}

export const getBirthRates = (regions: String[]): Promise<BirthRate[][]> => {
  return Promise.all(regions.map((region) => getBirthRatesByRegion(region)))
}

export const getDemographicValues = async <T = DemographicValue[]>(type: String) => {
  const { data } = await axiosClient.get<T>(`/getDemographicValues?type=${type}`)
  return data
}
