import './index.css'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import Routes from 'src/Routes'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%AppTitle : %PageTitle">
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
