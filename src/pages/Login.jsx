import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import axios from "axios";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const connexion = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    navigate("/map");

  } catch (error) {
    console.error(error);

    alert("Email ou mot de passe incorrect");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form onSubmit={connexion} className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Connexion
        </h2>

        <input
          className="w-full border p-3 rounded mb-4"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-6"
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Se connecter
        </button>

      </form>

    </div>
  );
}