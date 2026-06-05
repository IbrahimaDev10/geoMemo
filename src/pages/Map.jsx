import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Map() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🆕 champs formulaire
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [adresse, setAdresse] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCUPm4YPt-iTxdqGm4g-R4wxMZ3OZehxTw",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lieux, setLieux] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const chargerLieux = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:8000/api/lieux",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLieux(res.data);
  } catch (error) {
    console.log(error);
  }
};

const ouvrirGoogleMaps = (lat, lng) => {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    "_blank"
  );
};

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};


  useEffect(() => {
    chargerLieux();
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const enregistrerLieu = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/lieux",
        {
          nom,
          description,
          adresse,
          latitude: position.lat,
          longitude: position.lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lieu enregistré avec succès !");
      await chargerLieux();

      // reset
      setNom("");
      setDescription("");
      setAdresse("");

    } catch (error) {
      alert("Erreur lors de l'enregistrement");
    }

    setLoading(false);
  };

  if (!isLoaded || !position) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  }

  return (
  <div className="h-screen flex">

    {/* MOBILE MENU */}
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
    >
      ☰
    </button>

    {/* SIDEBAR */}
    <div
      className={`
        bg-white shadow-lg z-40
        fixed md:relative
        h-full
        w-80
        transition-all duration-300
        ${sidebarOpen ? "left-0" : "-left-80"}
        md:left-0
      `}
    >

      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-bold text-xl">
          Mes lieux
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Quitter
        </button>
        <button
        onClick={() => setShowForm(!showForm)}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded">
        + Ajouter un lieu
      </button>
      </div>

      {showForm && (
  <div className="p-4 border-b bg-gray-50">

    <input
      type="text"
      placeholder="Nom du lieu"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      className="w-full border p-2 rounded mb-2"
    />

    <input
      type="text"
      placeholder="Adresse"
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
      className="w-full border p-2 rounded mb-2"
    />

    <textarea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border p-2 rounded mb-2"
      rows="3"
    />

    <button
      onClick={enregistrerLieu}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded"
    >
      {loading ? "Enregistrement..." : "Enregistrer"}
    </button>

  </div>
)}

      <div className="overflow-y-auto h-[calc(100%-70px)]">

        {lieux.length === 0 && (
          <p className="p-4 text-gray-500">
            Aucun lieu enregistré
          </p>
        )}

        {lieux.map((lieu) => (
          <div
            key={lieu.id}
            className="border-b p-4 hover:bg-gray-100"
          >
            <h3 className="font-semibold">
              {lieu.nom}
            </h3>

            <p className="text-sm text-gray-600">
              {lieu.adresse}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {lieu.description}
            </p>

            <button
              onClick={() =>
                ouvrirGoogleMaps(
                  lieu.latitude,
                  lieu.longitude
                )
              }
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Voir sur Google Maps
            </button>
          </div>
        ))}

      </div>

    </div>

    {/* MAP */}
    <div className="flex-1">

      <GoogleMap
        center={position}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
      >

        {/* Position actuelle */}
        <Marker position={position} />

        {/* Lieux enregistrés */}
        {lieux.map((lieu) => (
          <Marker
            key={lieu.id}
            position={{
              lat: parseFloat(lieu.latitude),
              lng: parseFloat(lieu.longitude),
            }}
          />
        ))}

      </GoogleMap>

    </div>

  </div>
);
}