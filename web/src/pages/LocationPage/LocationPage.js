import { MetaTags } from '@redwoodjs/web'

import LocationCell from 'src/components/LocationCell'
import AppLayout from 'src/layouts/AppLayout'

const LocationPage = ({ address }) => {
  return (
    <>
      <AppLayout>
        <MetaTags title="Location" description="Location page" />
        <LocationCell address={address} />
      </AppLayout>
    </>
  )
}

export default LocationPage
