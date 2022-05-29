import { fetch } from 'cross-undici-fetch'

export const getAssessment = async ({ address }) => {
  const response = await fetch(
    `https://data.calgary.ca/resource/6zp6-pxei.json?ADDRESS=${address}&$order=ROLL_YEAR DESC&$limit=1`
  )
  const json = await response.json()

  if (json.length === 0) {
    return new Error(
      `Sorry. No solar potential data can be found for ${decodeURIComponent(
        address
      )}.`
    )
  }

  return {
    address: decodeURIComponent(address),
    roll_number: json[0].roll_number,
    assessed_value: json[0].assessed_value,
    assessed_year: json[0].roll_year,
  }
}
