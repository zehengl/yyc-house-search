import { fetch } from 'cross-undici-fetch'

export const getAssessment = async ({ address }) => {
  const response = await fetch(
    `https://data.calgary.ca/resource/4ur7-wsgc.json?ADDRESS=${address}&$order=ROLL_YEAR ASC`
  )
  const json = await response.json()

  if (json.length === 0) {
    return new Error(
      `Sorry. No assessment data can be found for ${decodeURIComponent(
        address
      )}.`
    )
  }

  return json.map((assessment) => ({
    address: decodeURIComponent(address),
    roll_number: assessment.roll_number,
    assessed_value: assessment.assessed_value,
    assessed_year: assessment.roll_year,
    latitude: assessment.multipolygon.coordinates[0][0][0][1],
    longitude: assessment.multipolygon.coordinates[0][0][0][0],
    year_of_construction: assessment.year_of_construction,
  }))
}
