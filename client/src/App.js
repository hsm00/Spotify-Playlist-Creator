import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

import Main from "./components/Main"
import Login from "./Login"
import Dashboard from "./Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
        {code ? (
          <Route path="/dashboard" element={<Dashboard code={code} />} />
          ) : (
            <Route path="/dashboard" element={<Dashboard />} />
            )}
          <Route  path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/playlist/:id" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>


    // code ? <Dashboard code={code} /> : <Login />
  )
}

export default App
