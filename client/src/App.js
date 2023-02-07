import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

import Login from "./Login"
import Dashboard from "./Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
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
}

export default App
