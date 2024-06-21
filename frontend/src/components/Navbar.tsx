import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-blue-500">
      <div className="container flex justify-between mx-auto">
        <div className="text-white">
          <Link to="/pacientes" className="mr-4">
            Pacientes
          </Link>
          <Link to="/odontologos" className="mr-4">
            Odontólogos
          </Link>
          <Link to="/turnos" className="mr-4">
            Turnos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
