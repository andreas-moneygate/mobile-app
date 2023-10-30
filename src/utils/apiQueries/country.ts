import { CountryEntry } from 'types/api/country'
import callApi from 'utils/callApi'

export const getCountries = (): Promise<Array<CountryEntry>> => {
  return callApi(`/Countries`, { method: 'GET' })
}