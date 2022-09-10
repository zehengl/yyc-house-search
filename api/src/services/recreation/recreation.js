import { fetch } from 'cross-undici-fetch'

export const getRecreations = async () => {
  const response = await fetch(
    `https://data.calgary.ca/resource/ssrd-qps9.json`
  )
  const json = await response.json()

  return json.map((recreation) => ({
    name: recreation.complex_name,
    latitude: recreation.latitude,
    longitude: recreation.longitude,
  }))
}
