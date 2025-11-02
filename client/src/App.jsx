import { Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/welcome/Welcome";
import BookAppointment from "./pages/book_appointment/BookAppointment";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import AboutUs from "./pages/about-us/about-us";
import Services from "./pages/services/services";
import Contact from "./pages/contact/contact";
import { AuthProvider } from "./context/AuthContext";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600, // duración de la animación
      once: true,     // solo se anima una vez
    });
  }, []);
  
  return (   
    
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Services />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
