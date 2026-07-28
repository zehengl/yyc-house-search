import { Metadata } from '@redwoodjs/web'

import LocationCell from 'src/components/LocationCell'
import AppLayout from 'src/layouts/AppLayout'

const LocationPage = ({ address }) => {
  return (
    <>
      <AppLayout>
        <Metadata title="Location" description="Location page" />
        <LocationCell address={address} />
      </AppLayout>
    </>
  )
}

export default LocationPage
