export const schema = gql`
  type PublicLibrary {
    name: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    getPublicLibraries: [PublicLibrary]! @skipAuth
  }
`
