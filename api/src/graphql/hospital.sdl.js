export const schema = gql`
  type Hospital {
    name: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    getHospitals: [Hospital]! @skipAuth
  }
`
