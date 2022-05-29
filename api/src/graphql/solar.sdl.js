export const schema = gql`
  type Solar {
    address: String!
    number_of_panels: String!
    ac_annually: String!
    area: String!
    capacity_factor: String!
  }
  type Query {
    getSolar(address: String!): Solar! @skipAuth
  }
`
