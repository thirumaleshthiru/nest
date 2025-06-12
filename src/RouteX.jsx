import { Routes,Route } from "react-router-dom"
import Home from "./Home"
import Analytics from "./Analytics"
import Loan from "./Loan"
import Transactions from "./Transactions"
function RouteX() {
return (
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/analytics" element={<Analytics/>} />
<Route path="/loan" element={<Loan/>} />
<Route path="/transactions" element={<Transactions/>} />


</Routes>
)
}

export default RouteX