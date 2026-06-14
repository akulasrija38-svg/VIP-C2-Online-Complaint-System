import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Navbar />
      <Routes>


        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
       <Footer />

    </BrowserRouter>
   </>
  );
}

export default App;