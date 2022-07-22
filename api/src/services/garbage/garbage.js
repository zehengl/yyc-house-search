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

  const black_day =
    json[0].collection_day_summer == json[0].collection_day_winter
      ? json[0].collection_day_summer
      : `${json[0].collection_day_summer} (summer) or ${json[0].collection_day_winter} (winter)`

  const blue_day =
    json[1].collection_day_summer == json[1].collection_day_winter
      ? json[1].collection_day_summer
      : `${json[1].collection_day_summer} (summer) or ${json[1].collection_day_winter} (winter)`

  const green_day =
    json[2].collection_day_summer == json[2].collection_day_winter
      ? json[2].collection_day_summer
      : `${json[2].collection_day_summer} (summer) or ${json[2].collection_day_winter} (winter)`

  return {
    address: decodeURIComponent(address),
    black: black_day,
    blue: blue_day,
    green: green_day,
  }
}
