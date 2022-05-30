const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>
          <div className="w-screen h-screen">{children}</div>
        </main>
      </div>
    </>
  )
}

export default AppLayout
