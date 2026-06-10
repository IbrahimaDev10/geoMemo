import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Lieux from "../pages/Lieux";
import MapPage from "../pages/MapPage";
import Favoris from "../pages/Favoris";
import Parametres from "../pages/Parametres";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginSuccess from "../pages/LoginSuccess";
import LoginError from "../pages/LoginError";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/login-error" element={<LoginError />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/lieux" element={<Lieux />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/favoris" element={<Favoris />} /> 
        <Route path="/parametres" element={<Parametres />} />

      </Route>

    </Routes>
  );
}