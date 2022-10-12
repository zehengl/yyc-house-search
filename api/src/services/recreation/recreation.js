import { fetch } from 'cross-undici-fetch'

export const getRecreations = async () => {
  const response = await fetch(
    `https://data.calgary.ca/resource/hxfu-6d96.json`
  )
  const json = await response.json()

  return json.map((recreation) => ({
    name: recreation.complex_name,
    latitude: recreation.point.coordinates[1],
    longitude: recreation.point.coordinates[0],
  }))
}
