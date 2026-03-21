import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  const [cart, setCart] = useState([])

  return (
    <div className="app-container">
      <Navbar cartCount={cart.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App