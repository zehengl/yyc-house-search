import { fetch } from 'cross-undici-fetch'

export const getGarbage = async ({ address }) => {
  const response = await fetch(
    `https://data.calgary.ca/resource/jq4t-b745.json?ADDRESS=${address}&$order=COMMODITY ASC`
  )
  const json = await response.json()

  if (json.length === 0) {
    return {
      address: decodeURIComponent(address),
      black: null,
      blue: null,
      green: null,
    }
  }

  return {
    address: decodeURIComponent(address),
    black: json[0].collection_day,
    blue: json[1].collection_day,
    green: json[2].collection_day,
  }
}
