import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import api from "../services/api";

import { useEffect, useState } from "react";
import { getLieux } from "../services/lieuService";

export default function MapPage() {
  const [position, setPosition] = useState(null);
  const [lieux, setLieux] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    //googleMapsApiKey: "AIzaSyCUPm4YPt-iTxdqGm4g-R4wxMZ3OZehxTw",
  });

  // Lieu choisi depuis la page Mes lieux
  const selectedLieu = JSON.parse(
    localStorage.getItem("selectedLieu")
  );

  useEffect(() => {
    chargerPosition();
    chargerLieux();
  }, []);

  const chargerPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const chargerLieux = async () => {
    try {
      const response = await getLieux();
      setLieux(response.data);
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

  if (!isLoaded || !position) {
    return (
      <div className="h-screen flex items-center justify-center">
        Chargement de la carte...
      </div>
    );
  }

  const center = selectedLieu
    ? {
        lat: parseFloat(selectedLieu.latitude),
        lng: parseFloat(selectedLieu.longitude),
      }
    : position;

  return (
    <div className="h-full w-full">

      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
        }}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {/* Position actuelle */}
        <Marker
          position={position}
          title="Ma position actuelle"
        />

        {/* Marqueurs enregistrés */}
        {lieux.map((lieu) => (
          <Marker
            key={lieu.id}
            position={{
              lat: parseFloat(lieu.latitude),
              lng: parseFloat(lieu.longitude),
            }}
            onClick={() => setSelectedMarker(lieu)}
          />
        ))}

        {/* Fenêtre d'information */}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedMarker.latitude),
              lng: parseFloat(selectedMarker.longitude),
            }}
            onCloseClick={() =>
              setSelectedMarker(null)
            }
          >
            <div className="min-w-[250px]">

              <h3 className="font-bold text-lg">
                {selectedMarker.nom}
              </h3>

              <p className="text-gray-600 mt-2">
                {selectedMarker.adresse}
              </p>

              <p className="mt-2 text-sm">
                {selectedMarker.description}
              </p>

              <button
                onClick={() =>
                  ouvrirGoogleMaps(
                    selectedMarker.latitude,
                    selectedMarker.longitude
                  )
                }
                className="
                  mt-4
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  w-full
                "
              >
                🗺️ M'y conduire
              </button>

            </div>
          </InfoWindow>
        )}
      </GoogleMap>

    </div>
  );
}