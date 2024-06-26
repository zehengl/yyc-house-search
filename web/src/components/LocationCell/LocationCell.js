import Plot from 'react-plotly.js'
import haversine from 'haversine-distance'

export const QUERY = gql`
  query GET_INFO($address: String!) {
    solar: getSolar(address: $address) {
      address
      number_of_panels
      ac_annually
      capacity_factor
    }
    assessments: getAssessment(address: $address) {
      address
      roll_number
      assessed_value
      assessed_year
      latitude
      longitude
      year_of_construction
    }
    tree: getTree(address: $address) {
      address
      number_of_trees
    }
    garbage: getGarbage(address: $address) {
      address
      black
      blue
      green
    }
    schools: getSchools {
      name
      latitude
      longitude
    }
    stops: getStops(address: $address) {
      name
      route_name
      latitude
      longitude
    }
    publicLibraries: getPublicLibraries {
      name
      latitude
      longitude
    }
    recreations: getRecreations {
      name
      latitude
      longitude
    }
    hospitals: getHospitals {
      name
      latitude
      longitude
    }
  }
`

export const Loading = () => (
  <div className="border border-red-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-8">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-red-400 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-red-400 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-red-400 rounded"></div>
          <div className="h-4 bg-red-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div className="py-12 bg-gray text-center">
    <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">
      Error: {error.message}
    </h2>
  </div>
)

export const Success = ({
  solar,
  assessments,
  tree,
  garbage,
  schools,
  stops,
  publicLibraries,
  recreations,
  hospitals,
}) => {
  let assessment = assessments[assessments.length - 1]
  let dist = (addr) => {
    let a = { latitude: addr.latitude, longitude: addr.longitude }
    let b = { latitude: assessment.latitude, longitude: assessment.longitude }
    return haversine(a, b)
  }
  let valid = (addrs) => {
    return addrs.filter((addr) => {
      return addr.latitude && addr.longitude
    })
  }
  let nearbySchools = valid(schools)
    .sort((a, b) => dist(a) - dist(b))
    .filter((school) => {
      return dist(school) < 1500
    })
  let nearbyStops = valid(stops)
    .sort((a, b) => dist(a) - dist(b))
    .filter((stop) => {
      return dist(stop) < 400
    })
  let nearbyPublicLibraries = valid(publicLibraries)
    .sort((a, b) => dist(a) - dist(b))
    .filter((publicLibrary) => {
      return dist(publicLibrary) < 3000
    })
  let nearbyRecreations = valid(recreations)
    .sort((a, b) => dist(a) - dist(b))
    .filter((recreation) => {
      return dist(recreation) < 3000
    })
  let nearbyHospitals = valid(hospitals)
    .sort((a, b) => dist(a) - dist(b))
    .filter((stop) => {
      return dist(stop) < 3000
    })
  let nearbyRouteNames = [
    ...new Set(nearbyStops.map((item) => item.route_name)),
  ].sort()
  let nearbySchoolNames = [
    ...new Set(nearbySchools.map((item) => item.name)),
  ].sort()
  let nearbyPublicLibraryNames = [
    ...new Set(nearbyPublicLibraries.map((item) => item.name)),
  ].sort()
  let nearbyRecreationNames = [
    ...new Set(nearbyRecreations.map((item) => item.name)),
  ].sort()
  let nearbyHospitalNames = [
    ...new Set(nearbyHospitals.map((item) => item.name)),
  ].sort()

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">
            Property Information
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {solar.address}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            You may want to know that
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Roll Number
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                The roll number is {assessment.roll_number}.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Assessment
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                The property was assessed of ${assessment.assessed_value} in{' '}
                {assessment.assessed_year}, and originally built in{' '}
                {assessment.year_of_construction}.
              </dd>
            </div>
          </dl>
        </div>

        {solar.number_of_panels && (
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Solar Panels
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  The rooftop can fit optimally as many as{' '}
                  {solar.number_of_panels} solar panels.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Yearly AC
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  The AC power generated from those solar panels per year is as
                  much as {solar.ac_annually} kwh, with a capacity factor of{' '}
                  {solar.capacity_factor}.
                </dd>
              </div>
            </dl>
          </div>
        )}
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Public Trees
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                The City manages{' '}
                {tree.number_of_trees > 0 ? tree.number_of_trees : 'no'} tree
                {tree.number_of_trees > 1 ? 's' : ''} on the property.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Garbage Collection
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {garbage.black && (
                  <p>Black bin is collected on {garbage.black}.</p>
                )}
                {garbage.blue && (
                  <p>Blue bin is collected on {garbage.blue}.</p>
                )}
                {garbage.green && (
                  <p>Green bin is collected on {garbage.green}.</p>
                )}
                {!garbage.black && !garbage.blue && !garbage.green && (
                  <p>No garbage collection date found.</p>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nearby Schools <span className="text-sm">(within 1.5km)</span>
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {nearbySchoolNames.length > 0 ? (
                  nearbySchoolNames.map((name) => <p key={name}>{name}</p>)
                ) : (
                  <p>No nearby schools found.</p>
                )}
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nearby Routes <span className="text-sm">(within 400m)</span>
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {nearbyRouteNames.length > 0 ? (
                  nearbyRouteNames.map((name) => <p key={name}>{name}</p>)
                ) : (
                  <p>No nearby routes/stops found.</p>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nearby Libraries <span className="text-sm">(within 3km)</span>
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {nearbyPublicLibraryNames.length > 0 ? (
                  nearbyPublicLibraryNames.map((name) => (
                    <p key={name}>{name}</p>
                  ))
                ) : (
                  <p>No nearby public libraries found.</p>
                )}
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nearby Recs <span className="text-sm">(within 3km)</span>
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {nearbyRecreationNames.length > 0 ? (
                  nearbyRecreationNames.map((name) => <p key={name}>{name}</p>)
                ) : (
                  <p>No nearby recreation center found.</p>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nearby Hospitals <span className="text-sm">(within 3km)</span>
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {nearbyHospitalNames.length > 0 ? (
                  nearbyHospitalNames.map((name) => <p key={name}>{name}</p>)
                ) : (
                  <p>No nearby hospitals found.</p>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <Plot
          data={[
            {
              type: 'bar',
              x: assessments.map((assessment) => assessment.assessed_year),
              y: assessments.map((assessment) => assessment.assessed_value),
              marker: {
                color: 'rgb(239 68 68);',
              },
            },
          ]}
          layout={{
            title: 'Assessment History',
            showlegend: false,
          }}
        />
      </div>
    </div>
  )
}
