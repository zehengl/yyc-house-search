const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>
          <div className="w-screen h-screen">{children}</div>
        </main>
        <footer className="w-full">
          <div className="flex items-center justify-center">
            <a href="https://www.netlify.com">
              <img
                src="https://www.netlify.com/img/global/badges/netlify-light.svg"
                alt="Deploys by Netlify"
              />
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default AppLayout
