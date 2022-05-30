export const QUERY = gql`
  query GET_INFO($address: String!) {
    solar: getSolar(address: $address) {
      address
      number_of_panels
      ac_annually
      capacity_factor
    }
    assessment: getAssessment(address: $address) {
      address
      roll_number
      assessed_value
      assessed_year
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

export const Success = ({ solar, assessment, tree, garbage }) => {
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
                {assessment.assessed_year}.
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
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
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
                Black bin is collected on {garbage.black}; Blue bin is collected
                on {garbage.blue}; Green bin is collected on {garbage.green}.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
