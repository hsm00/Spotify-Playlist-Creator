import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

import Login from "./Login"
import Dashboard from "./Dashboard"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
<<<<<<< Updated upstream
  return code ? <Dashboard code={code} /> : <Login />
=======
  return (
    
    <BrowserRouter>
        <Routes>
        {code ? (
          <Route path="/dashboard" element={<Dashboard code={code} />} />
          ) : (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          <Route path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>


    // code ? <Dashboard code={code} /> : <Login />
  )
>>>>>>> Stashed changes
}

export default App
