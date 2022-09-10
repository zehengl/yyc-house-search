import { fetch } from 'cross-undici-fetch'

export const getPublicLibraries = async () => {
  const response = await fetch(
    `https://data.calgary.ca/resource/m9y7-ui7j.json`
  )
  const json = await response.json()

  return json.map((publicLibrary) => ({
    name: publicLibrary.library,
    latitude: publicLibrary.location.latitude,
    longitude: publicLibrary.location.longitude,
  }))
}
