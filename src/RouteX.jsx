import { Routes,Route } from "react-router-dom"
import Home from "./Home"
import Analytics from "./Analytics"

function RouteX() {
  return (
   <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/analytics" element={<Analytics/>} />
   </Routes>
  )
}

export default RouteX