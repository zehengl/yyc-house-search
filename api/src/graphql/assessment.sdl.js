export const schema = gql`
  type Assessment {
    address: String!
    roll_number: String!
    assessed_value: String!
    assessed_year: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    getAssessment(address: String!): Assessment! @skipAuth
  }
`
