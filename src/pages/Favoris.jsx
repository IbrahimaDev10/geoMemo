import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LieuCard from "../components/LieuCard";

import { getLieux } from "../services/lieuService";

export default function Favoris() {

  const navigate = useNavigate();

  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    chargerFavoris();
  }, []);

  const chargerFavoris = async () => {

    try {

      const response =
        await getLieux();

      const data =
        response.data.filter(
          lieu => lieu.is_favorite
        );

      setFavoris(data);

    } catch (error) {

      console.log(error);
    }
  };

  const voirLieu = (lieu) => {

    localStorage.setItem(
      "selectedLieu",
      JSON.stringify(lieu)
    );

    navigate("/map");
  };

  const conduireVersLieu = (lieu) => {

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lieu.latitude},${lieu.longitude}`,
      "_blank"
    );
  };

  return (
    <div className="p-6">

      <h1
        className="
          text-3xl
          font-bold
          mb-6
          text-[rgb(0,162,232)]
        "
      >
        ⭐ Mes favoris
      </h1>

      {favoris.length === 0 && (

        <div
          className="
            bg-white
            rounded-2xl
            shadow
            p-8
            text-center
          "
        >
          Aucun favori pour le moment
        </div>

      )}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4
        "
      >

        {favoris.map((lieu) => (

          <LieuCard
            key={lieu.id}
            lieu={lieu}
            onView={voirLieu}
            onNavigate={conduireVersLieu}
          />

        ))}

      </div>

    </div>
  );
}