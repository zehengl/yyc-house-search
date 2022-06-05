import { fetch } from 'cross-undici-fetch'

export const getStops = async ({ address }) => {
  let parts = decodeURIComponent(address).split(' ').reverse()
  const response = await fetch(
    `https://data.calgary.ca/resource/muzh-c9qc.json?STATUS=ACTIVE&$limit=3000&$q=${parts[0]}`
  )
  const json = await response.json()

  return json.map((stop) => ({
    name: stop.stop_name,
    latitude: stop.point.coordinates[1],
    longitude: stop.point.coordinates[0],
  }))
}
