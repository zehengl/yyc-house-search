export const schema = gql`
  type Tree {
    address: String!
    number_of_trees: String!
  }
  type Query {
    getTree(address: String!): Tree! @skipAuth
  }
`
