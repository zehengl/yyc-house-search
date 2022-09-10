export const schema = gql`
  type Recreation {
    name: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    getRecreations: [Recreation]! @skipAuth
  }
`
