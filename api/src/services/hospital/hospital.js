import { fetch } from 'cross-undici-fetch'

export const getHospitals = async () => {
  const responseClinic = await fetch(
    `https://data.calgary.ca/resource/x34e-bcjz.json?type=PHS Clinic`
  )
  const jsonClinic = await responseClinic.json()

  const responseHospital = await fetch(
    `https://data.calgary.ca/resource/x34e-bcjz.json?type=Hospital`
  )
  const jsonHospital = await responseHospital.json()

  const json = jsonClinic.concat(jsonHospital)

  return json.map((hospital) => ({
    name: hospital.name,
    latitude: hospital.point.coordinates[1],
    longitude: hospital.point.coordinates[0],
  }))
}
