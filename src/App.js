import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/MainPage";
import DetailView from "./pages/DetailView";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Periksa status login dari localStorage setiap kali aplikasi di-refresh
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedIn); // Konversi ke boolean
    
    // Jika status login berubah menjadi false, arahkan ke halaman login
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/:id" element={isLoggedIn ? <DetailView /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
