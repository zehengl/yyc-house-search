export const schema = gql`
  type Garbage {
    address: String!
    black: String!
    blue: String!
    green: String!
  }
  type Query {
    getGarbage(address: String!): Garbage! @skipAuth
  }
`
