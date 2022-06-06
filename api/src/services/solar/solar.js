import { fetch } from 'cross-undici-fetch'

export const getSolar = async ({ address }) => {
  const response = await fetch(
    `https://data.calgary.ca/resource/k85e-i265.json?address=${address}`
  )
  const json = await response.json()

  if (json.length === 0) {
    return {
      address: decodeURIComponent(address),
      number_of_panels: null,
      ac_annually: null,
      area: null,
      capacity_factor: null,
    }
  }

  const sum = (prev, next) => prev + next

  const number_of_panels = json
    .map((item) => parseFloat(item.number_of_panels))
    .reduce(sum)

  const ac_annually = json
    .map(
      (item) =>
        parseFloat(item.ac_annually_per_panel) *
        parseFloat(item.number_of_panels)
    )
    .reduce(sum)

  const capacity_factor = ac_annually / (0.4 * number_of_panels * 24 * 365)
  return {
    address: decodeURIComponent(address),
    number_of_panels: number_of_panels,
    ac_annually: ac_annually.toFixed(2),
    area: json.map((item) => parseFloat(item.area)).reduce(sum),
    capacity_factor: (100 * capacity_factor).toFixed(2) + '%',
  }
}
