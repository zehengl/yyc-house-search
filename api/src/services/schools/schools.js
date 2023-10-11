import { fetch } from 'cross-undici-fetch'

export const getSchools = async () => {
  const response = await fetch(
    `https://data.calgary.ca/resource/fd9t-tdn2.json`
  )
  const json = await response.json()

  return json.map((school) => ({
    name: school.name,
    latitude: school.point.coordinates[1],
    longitude: school.point.coordinates[0],
  }))
}
