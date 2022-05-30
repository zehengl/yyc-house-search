export const QUERY = gql`
  query FindLocationQuery($id: Int!) {
    location: location(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ location }) => {
  return <div>{JSON.stringify(location)}</div>
}
