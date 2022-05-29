import { fetch } from 'cross-undici-fetch'

export const getTree = async ({ address }) => {
  const response = await fetch(
    `https://data.calgary.ca/resource/tfs4-3wwa.json?LOCATION_DETAIL=${address}`
  )
  const json = await response.json()

  return {
    address: decodeURIComponent(address),
    number_of_trees: json.length,
  }
}
