import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboardLayout from "./pages/Admin/Layout/AdminDashboardLayout";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AlumniMap from "./pages/FindAlumni/AlumniMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboardLayout><AdminDashboard/></AdminDashboardLayout>}/>
        <Route path="/admin/map" element={<AdminDashboardLayout><AlumniMap/></AdminDashboardLayout>} />
      </Routes>
      <ToastContainer position="top-right" autoclose={ 3000 } />
    </BrowserRouter>
  )
}

export default App