import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Lieux from "../pages/Lieux";
import MapPage from "../pages/MapPage";
import Favoris from "../pages/Favoris";
import Parametres from "../pages/Parametres";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

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