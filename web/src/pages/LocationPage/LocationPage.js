import AppLayout from 'src/layouts/AppLayout'
import LocationCell from 'src/components/LocationCell'
import { MetaTags } from '@redwoodjs/web'

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
