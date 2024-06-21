import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      // handle successful login...
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="mb-6 text-2xl">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 active:scale-95"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/signup" className="text-blue-500">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
