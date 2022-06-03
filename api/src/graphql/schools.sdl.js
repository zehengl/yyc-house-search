export const schema = gql`
  type School {
    name: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    getSchools: [School]! @skipAuth
  }
`
