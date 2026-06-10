import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useEffect, useState } from "react";

export default function MapPage() {

  const [position, setPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (!isLoaded || !position) {
    return (
      <div className="h-screen flex items-center justify-center">
        Chargement de votre position...
      </div>
    );
  }

  return (
    <div className="h-full w-full">

      <GoogleMap
        center={position}
        zoom={17}
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

        <Marker
          position={position}
          title="Ma position actuelle"
        />

      </GoogleMap>

    </div>
  );
}