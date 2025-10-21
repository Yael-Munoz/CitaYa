import { Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/welcome/Welcome";
import BookAppointment from "./pages/book_appointment/BookAppointment";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
