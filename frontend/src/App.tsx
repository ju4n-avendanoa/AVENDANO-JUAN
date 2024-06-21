import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pacientes from "./pages/Pacientes";
import Odontologos from "./pages/Odontologos";
import Turnos from "./pages/Turnos";
import Domicilios from "./pages/Domicilios";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container p-4 mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/odontologos" element={<Odontologos />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/domicilios" element={<Domicilios />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
