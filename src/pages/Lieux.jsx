import { useEffect, useState } from "react";
import { getLieux, toggleFavorite } from "../services/lieuService";
import LieuCard from "../components/LieuCard";
import AddLieuModal from "../components/AddLieuModal";
import { Plus } from "lucide-react";

export default function Lieux() {
  const [lieux, setLieux] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    chargerLieux();
  }, []);

  const chargerLieux = async () => {
    try {
      const res = await getLieux();
      setLieux(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const voirLieu = (lieu) => {
    localStorage.setItem(
      "selectedLieu",
      JSON.stringify(lieu)
    );

    window.location.href = "/map";
  };

  const favoris = async (id) => {

    try {

      await toggleFavorite(id);

      setLieux((prev) =>
        prev.map((lieu) =>
          lieu.id === id
            ? {
                ...lieu,
                is_favorite:
                  !lieu.is_favorite,
              }
            : lieu
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

  const supprimerLieu = (id) => {

    setLieux((prev) =>
      prev.filter(
        (lieu) => lieu.id !== id
      )
    );
  };

  const lieuxFiltres =
    lieux.filter((lieu) =>
      lieu.nom
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  const conduireVersLieu = (lieu) => {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lieu.latitude},${lieu.longitude}`,
    "_blank"
  );
};

const partagerLieu = (lieu) => {

  const url =
    `https://www.google.com/maps?q=${lieu.latitude},${lieu.longitude}`;

  const message =
    `📍 ${lieu.nom}\n\n${lieu.description}\n\n${url}`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

  return (
    <div className="p-6 h-screen overflow-auto">

<div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold text-[rgb(0,162,232)]">
    Mes lieux
  </h1>
  <input
  type="text"
  placeholder="Rechercher..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="
    
    border
    rounded-md
   
  "
/>

  <button
    onClick={() => setShowModal(true)}
    className="
      bg-[rgb(0,162,232)]
      text-white
      px-4
      py-2
      rounded-xl
      flex
      items-center
      gap-2
    "
  >
    <Plus size={18} />
    Ajouter
  </button>

</div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        "
      >
        {lieuxFiltres.map((lieu) => (
          <LieuCard
            key={lieu.id}
            lieu={lieu}
            onView={voirLieu}
            onNavigate={conduireVersLieu}
            onDelete={supprimerLieu}
            onToggleFavorite={favoris}
            onShare={partagerLieu}
          />
        ))}
      </div>
       <AddLieuModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={chargerLieux}
        
       />

    </div>
  );
}