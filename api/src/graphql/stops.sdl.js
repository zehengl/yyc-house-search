export const schema = gql`
  type Stop {
    name: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    getStops(address: String!): [Stop]! @skipAuth
  }
`
